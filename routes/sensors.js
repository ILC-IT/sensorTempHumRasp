const express = require('express');
const router = express.Router();
const resources = require('./../resources/model');
const Influx = require('influx');
const os = require('os');
const influx = require('./../resources/database');
const rp = require('./../resources/databaseRP');

router.route('/').get(function (req, res, next) {
	res.send(resources.pi.sensors);
});

router.route('/temperature').get(function (req, res, next) {
	res.send(resources.pi.sensors.temperature);
});

router.route('/humidity').get(function (req, res, next) {
	res.send(resources.pi.sensors.humidity);
});

router.route('/dht22').get(function (req, res, next) {
	res.send(resources.pi.sensors.dht22);
});

router.route('/sensordht22_db').get(function (req, res) {
  influx.query(`
    select * from ${rp.measurement}
    where host = ${Influx.escape.stringLit(os.hostname())}
    order by time desc
    limit 10
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
});

module.exports = router;
