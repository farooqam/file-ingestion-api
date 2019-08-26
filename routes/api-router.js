const express = require('express');

const {
  bodyExists,
  getPathConfig,
  createPathDescriptor,
  createPhysicalPath,
  generateUniqueFileName,
  writeFile,
} = require('../services/request-path-service');

const fileController = require('../controllers/file-controller');

// eslint-disable-next-line new-cap
const api = express.Router();

api.use([
  bodyExists,
  getPathConfig,
  createPathDescriptor,
  createPhysicalPath,
  generateUniqueFileName,
  writeFile]);

api.post('/files', fileController.post);

module.exports = api;
