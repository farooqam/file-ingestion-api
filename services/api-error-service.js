const httpStatus = require('http-status');

module.exports = (msg, status, data) => {
  if (msg === null) {
    msg = 'An error occurred.';
  }

  if (status === null) {
    status = httpStatus.INTERNAL_SERVER_ERROR;
  }

  const error = new Error(msg);
  error.status = status;
  error.data = data;
  return error;
};
