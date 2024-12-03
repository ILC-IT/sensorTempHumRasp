// Configure database name and measurement
const database_name = 'sensordht22_db';
const measurement = 'data_values';

// Configure retention policy variables
const enableRP = true; // This is for enable the rp after creating the database
const name = '7d'; // Required
const duration = '7d'; // Required
const replication = 1; // Required
const isDefault = true; // Optional

module.exports = {
	database_name,
	measurement,
	enableRP,
	name,
	duration,
	replication,
	isDefault
};