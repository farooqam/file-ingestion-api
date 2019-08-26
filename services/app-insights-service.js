const appInsights = require('applicationinsights');
const apiError = require('./api-error-service');

let appInsightsKey;

const getAppInsightsKey = () => {
  return process.env.APPINSIGHTS_INSTRUMENTATIONKEY;
};

const ensureEnvironment = () => {
  appInsightsKey = getAppInsightsKey();

  if (!appInsightsKey) {
    throw apiError('APPINSIGHTS_INSTRUMENTATIONKEY not set.');
  }
};

const start = () => {
  appInsights.setup(getAppInsightsKey())
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .start();
};

const getClient = () => {
  return appInsights.defaultClient;
};

const logException = (errorObject) => {
  getClient().trackException({exception: JSON.stringify(errorObject)});
};

module.exports = {
  start,
  ensureEnvironment,
  getClient,
  logException,
};
