const httpServer = require('./servers/http');
const dht = require('./sensors/DHT22Sensor');
const resources = require('./resources/model');
const influx = require('./resources/database');
const rp = require('./resources/databaseRP');

influx
  .getDatabaseNames()
  .then((names) => {
	// console.log('My database names are: ' + names.join(', '));  
    if (!names.includes(rp.database_name)) {
      return influx
        .createDatabase(rp.database_name)
        .then(() => {
          console.log('New database created: %s', rp.database_name);

          if (rp.enableRP){
            return influx
              .createRetentionPolicy(rp.name, {
                database: rp.database_name,
                duration: rp.duration,
                replication: rp.replication,
                isDefault: rp.isDefault
              })
              .then(() =>{
                console.log('New retention policy created: %s on database: %s', rp.name, rp.database_name);
              })
              .catch((err) => {
                console.error('Error creating retention policy on database %s: %s', rp.database_name, err);
                throw err; // Repropaga el error para el manejo global
              });
          }
		    });
    }
  })
  .then(() => {
    dht.start({'frequency': resources.pi.frequency}); // Frequency of data reads in ms
    httpServer.listen(resources.pi.port, function () {
      console.log('%s is ON and running on port %s with data reads every %ss', resources.pi.name, resources.pi.port, resources.pi.frequency/1000);
    });
  })
  .catch((err) => {
    console.error('Error creating Influx database: %s', err);
  });
