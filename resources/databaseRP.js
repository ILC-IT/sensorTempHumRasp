// Configure database name and measurement
const database_name = 'sensordht22_db';
const measurement = 'data_values';
const port = 8086;

// Configure user, password, admin
const createUser = false; // True for creating a new user
const isAdmin = false; // True to make user an admin
const user = '';
const password = '';

// Configure retention policy variables
const enableRP = true; // This is for enable the rp after creating the database
const name = '7d'; // Required
const duration = '7d'; // Required
const replication = 1; // Required
const isDefault = true; // Optional

module.exports = {
	database_name,
	measurement,
	port,
	createUser,
	isAdmin,
	user,
	password,
	enableRP,
	name,
	duration,
	replication,
	isDefault
};