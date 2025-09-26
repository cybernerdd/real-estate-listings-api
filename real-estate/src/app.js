const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;



