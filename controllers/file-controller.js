const httpStatus = require('http-status');

const post = (req, res, next) => {
  try {
    res.status(httpStatus.ACCEPTED).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  post,
};

