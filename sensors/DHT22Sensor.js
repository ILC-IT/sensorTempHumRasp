const resources = require('./../resources/model');
const os = require('os');
const influx = require('./../resources/database');
const rp = require('./../resources/databaseRP');

let sensor;
let model = resources.pi.sensors;
let name = 'Temperature & Humidity';
let localParams = {'frequency': 600000};

exports.start = function (params) {
	localParams = params;
	readSensor();
};

exports.stop = function () {
	sensor.unexport();
	console.info('%s sensor stopped', name);
};

function readSensor() {

	let sensorLib = require("node-dht-sensor");
	 
	let app = {
		sensors: [{
			name: model.dht22.name,
			type: model.dht22.type,
			pin: model.dht22.gpio
		}],
		read: function() {
			for (let sensor in this.sensors) {
				let readout = sensorLib.read(
					this.sensors[sensor].type,
					this.sensors[sensor].pin
				);
				model.temperature.value = readout.temperature;
				model.dht22.valueTemp = readout.temperature;
				model.humidity.value = readout.humidity;
				model.dht22.valueHum = readout.humidity;
				// showValue();
				influx.writePoints([
					{
						measurement: rp.measurement,
						tags: { 
							host: os.hostname()
						},
						fields: { 
							temperature: readout.temperature, 
							humidity: readout.humidity 
						}
					}
				]).catch(err => {
					console.error(`Error saving data to InfluxDB! ${err.stack}`)
				})
			}
			setTimeout(function() {
				app.read();
			}, localParams.frequency);
		}
	};
	app.read();
};


function showValue() {
	console.log('Temperature: %s ºC, humidity %s \%', model.temperature.value.toFixed(1), model.humidity.value.toFixed(1));
}
