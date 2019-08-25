const express = require('express');
const assert = require('assert');
const _ = require('lodash');
const httpStatus = require('http-status');
const fileController = require('../controllers/file-controller');

// eslint-disable-next-line new-cap
const api = express.Router();

const bodyExists = (req, res, next) => {
  if (!req.body || !req.body[0]) {
    res.status(httpStatus.BAD_REQUEST)
        .send({msg: 'File contents must be specified in body.'});
  } else {
    next();
  }
};

const bodyHasValidHeader = (req, res, next) => {
  const config = req.params.config || '/deviceId/type/ts:YYYYMMDD';
  const timestampKey = req.params.timestampKey || 'timeStamp';
  const header = req.body[0];

  assert(header !== null);

  const missingValues = [];

  if (!header[timestampKey]) {
    missingValues.push(`Header key ${timestampKey} is missing.`);
  }

  const configKeys = _.split(config, '/').filter((ck) => ck.length > 0);
  const pathDescriptor = {};

  _.forIn(configKeys, (value, key) => {
    if (_.startsWith(value, 'ts')) {
      timeStampInfo = {};
      timeStampInfo['key'] = timestampKey;
      timeStampInfo['format'] = value;
      timeStampInfo['value'] = header[timestampKey];  
      pathDescriptor.timeStampInfo = timeStampInfo;
    } else {
      if (!header[value]) {
        missingValues.push(`Header key ${value} is missing.`);
      } else {
        pathDescriptor[value] = header[value];
      }
    }
  }
  );

  if (missingValues.length > 0) {
    res.status(httpStatus.BAD_REQUEST)
        .send({errors: missingValues});
  } else {
    req.app.locals.pathDescriptor = pathDescriptor;
    next();
  }
};


api.use([bodyExists, bodyHasValidHeader]);
api.post('/files', fileController.post);

module.exports = api;
