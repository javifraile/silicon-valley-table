const express = require('express');

const episodesRouter = require('./routes/episodes');
const { handleErrors, handle404Error } = require('./utils/errorHandler');

const app = express();

app.use('/episodes', episodesRouter);

app.use(handle404Error);

app.use(handleErrors);

module.exports = app;
