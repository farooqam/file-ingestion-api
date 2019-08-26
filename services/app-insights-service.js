const express = require('express');
const appInsights = require('applicationinsights');
const apiError = require('./api-error-service');

const app = express();

let appInsightsKey;

const ensureEnvironment = () => {
  appInsightsKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY;

  if (!appInsightsKey) {
    throw apiError('APPINSIGHTS_INSTRUMENTATIONKEY not set.');
  }
};

const start = () => {
  appInsights.setup(appInsightsKey)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .start();

  app.locals.appInsightsClient = appInsights.defaultClient;
};

module.exports = {
  start,
  ensureEnvironment,
};
