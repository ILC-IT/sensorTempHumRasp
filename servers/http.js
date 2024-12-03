const express = require('express');
const sensorRoutes = require('./../routes/sensors');
const cors = require('cors');
const bodyParser = require ('body-parser');

const app = express();

app.use(cors());

//bodyParser is used for getting the values in a POST or PUT petition in que req.body element
app.use(bodyParser.json());

app.use('/pi/sensors', sensorRoutes);

module.exports = app;
