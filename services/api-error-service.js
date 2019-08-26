const httpStatus = require('http-status');

module.exports = (msg, status) => {
  if (msg === null) {
    msg = 'An error occurred.';
  }

  if (status === null) {
    status = httpStatus.INTERNAL_SERVER_ERROR;
  }

  const error = new Error(msg);
  error.status = status;
  return error;
};
