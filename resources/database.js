// Configure database

const rp = require('./databaseRP');
const Influx = require('influx');

const influx_database = new Influx.InfluxDB({
  host: 'localhost',
  database: rp.database_name,
  // port: rp.port,
  // username: rp.user, //uncomment if createUser is true
  // password: rp.password, //uncomment if createUser is true
  schema: [{
      measurement: rp.measurement,
      fields: {
        temperature: Influx.FieldType.FLOAT,
        humidity: Influx.FieldType.FLOAT
      },
      tags: [
        'host'
      ]
    }]
});

module.exports = influx_database;