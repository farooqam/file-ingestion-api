const appInsights = require('./app-insights-service');

module.exports = (error, req, res, next) => {
  appInsights.logException(error.root);
  res.status(error.status).send(error.root);
};
