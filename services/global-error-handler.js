const httpStatus = require('http-status');

const appInsights = require('./app-insights-service');

module.exports = (error, req, res, next) => {
  const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message;
  const data = error.data;

  const errorObject = {
    message,
    data,
  };

  const appInsightsClient = appInsights.getClient();
  appInsightsClient.trackException({exception: errorObject});
  res.status(status).send({error: errorObject});
};
