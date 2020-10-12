require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('./_helpers/jwt-helper');
const errorHandler = require('./_helpers/error-handler');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt());
app.use(errorHandler);

app.use('/users', require('./users/users.controller'));
app.use('/equipment', require('./equipment/equipment.controller'));
app.use('/categories', require('./categories/categories.controller'));
app.use('/sets', require('./sets/sets.controler'));

const server = app.listen(7555, () => {
  console.log('Server running on http://localhost:7555 :)');
});
