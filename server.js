require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('./_helpers/jwt-helper');
const errorHandler = require('./_helpers/error-handler');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.use(jwt());
app.use(errorHandler);

app.use('/users', require('./users/users.controller'));
app.use('/equipment', require('./equipment/equipment.controller'));
app.use('/categories', require('./categories/categories.controller'));
app.use('/sets', require('./sets/sets.controler'));
app.use('/images', require('./images/images.controler'));

const server = app.listen(7555, () => {
  console.log('Server running on http://localhost:7555 :)');
});
