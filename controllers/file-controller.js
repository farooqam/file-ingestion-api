const httpStatus = require('http-status');

const post = (req, res) => {
  res.status(httpStatus.ACCEPTED).send({msg: 'Accepted'});
};

module.exports = {
  post,
};

