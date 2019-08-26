const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const globalErrorHandler = require('./services/global-error-handler');
const blobService = require('./services/azure-blob-service');
const apiRouter = require('./routes/api-router');
const appInsights = require('./services/app-insights-service');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);
app.use(globalErrorHandler);

blobService.ensureEnvironment();

if (!process.env.APPINSIGHTS_DISABLED) {
  console.log('Application Insights monitoring is disabled.');
  appInsights.ensureEnvironment();
  appInsights.start();
}

module.exports = app;
