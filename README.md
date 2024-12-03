# What is this for?
- Reads temperature and humidity from a dht22 sensor connected to a Raspberry Pi via GPIO, with `node-dht-sensor` package and saves data with `node-influx` into Influxdb 1.6.7
- You can see data values with Grafana (an example dashboard is provided).

# What you need
- Raspberry Pi (tested with 3b+).
- DHT22 sensor + cables.
- Influxdb installed and configured.
- (Optional) Grafana installed and configured to see graphs.

# Configure
- Resources --> resources.json:
  - `port`: port for server listening.
  - `frequency`: milliseconds of data reads interval. How often it will get readings.
  - `gpio`: gpio's number that sensor is connected to.
  - `type`: 11 for dht11, 22 for dht22 or AM2302.
  
- Resources --> database.js:
  - Configure the `database` and `schema` to use.

- Resources --> databaseRP.js:
  - Configure the `database name`, the `measurement`, `user - password` and the `retention policy` options.
  
# Install
- npm install

# Run
- node server.js
- With pm2: pm2 start "node server.js" --watch --name "DHT22"

Server is tested with [node-influx 5.9.3](https://github.com/node-influx/node-influx/), Influxdb version 1.6.7 and node v23.1.0

### Some Influxdb commands
- USE `database`
- SHOW DATABASES
- SELECT * FROM `database`
- SHOW RETENTION POLICIES ON `database`
- DROP DATABASE `database`

### Check db size on disk
- sudo du -sh /var/lib/influxdb/data/<db name>
