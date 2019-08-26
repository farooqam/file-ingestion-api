const appInsights = require('applicationinsights');
const apiError = require('./api-error-service');

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
};

module.exports = {
  start,
  ensureEnvironment,
};
