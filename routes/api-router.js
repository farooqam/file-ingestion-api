const express = require('express');
const fileController = require('../controllers/file-controller');

// eslint-disable-next-line new-cap
const api = express.Router();

api.post('/files', fileController.post);

module.exports = api;
