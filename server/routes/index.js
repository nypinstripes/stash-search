const envVars = require('../config');
const express = require('express');
const helpers = require('../utils/helper-utils');
const isBrowserSupported = helpers.isBrowserSupported;
const router = express.Router();
const UAParser = require('ua-parser-js');

router.get('/', (req, res, next) => {
  const { headers: { 'user-agent': agent }} = req;
  let parser = UAParser(agent);

  if (!isBrowserSupported(parser)) res.render('unsupported');

  res.render('index', { envVars });
});

module.exports = router;
