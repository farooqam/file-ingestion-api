const app = require('../app');
const httpStatus = require('http-status');

module.exports = (error, req, res, next) => {
  const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message;
  const data = error.data;

  const errorObject = {
    message,
    data,
  };

  app.locals.appInsightsClient.trackException({exception: errorObject});
  res.status(status).send({error: errorObject});
};
