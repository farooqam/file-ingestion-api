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

const getPathConfig = (req, res, next) => {
  const pathConfig = req.query.config || '/deviceId/type/ts:YYYYMMDD';
  req.app.locals.pathConfig = pathConfig;
  next();
};

const createPathDescriptor = (req, res, next) => {
  const timestampKey = req.query.timestampKey || 'timeStamp';
  const header = req.body[0];

  assert(header !== null);

  const missingValues = [];

  if (!header[timestampKey]) {
    missingValues.push(`Header key ${timestampKey} is missing.`);
  }
  assert(req.app.locals.pathConfig !== null);

  const configKeys = _.split(req.app.locals.pathConfig, '/')
      .filter((ck) => ck.length > 0);

  const pathDescriptor = {};

  _.forIn(configKeys, (value, key) => {
    if (_.startsWith(value, 'ts')) {
      timeStampInfo = {};
      timeStampInfo['key'] = timestampKey;
      timeStampInfo['format'] = _.replace(value, 'ts:', '');
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


api.use([bodyExists, getPathConfig, createPathDescriptor]);
api.post('/files', fileController.post);

module.exports = api;
