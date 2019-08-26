const httpStatus = require('http-status');

const post = (req, res) => {
  res.status(httpStatus.ACCEPTED).send();
};

module.exports = {
  post,
};

