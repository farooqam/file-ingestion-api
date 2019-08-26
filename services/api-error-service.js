const httpStatus = require('http-status');

module.exports = (message, status, data) => {
  if (!message) {
    message = 'An error occurred.';
  }

  if (!status) {
    status = httpStatus.INTERNAL_SERVER_ERROR;
  };

  return {
    root: {
      error: {
        message,
        data,
      },
    },
    status,
  };
};
