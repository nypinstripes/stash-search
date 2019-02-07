const agents = require('../../shared/data/browsers');
const envVars = require('../config');
const express = require('express');
const helpers = require('../utils/helper-utils');
const isBrowserSupported = helpers.isBrowserSupported;
const router = express.Router();
const shapes = require('../../shared/data/svgs');
const UAParser = require('ua-parser-js');

router.get('/', (req, res, next) => {
  const { headers: { 'user-agent': agent }} = req;
  let parser = UAParser(agent);
  let view = 'index';
  let locals = { shapes };

  if (!isBrowserSupported(parser)) {
    locals.browsers = agents.browsers.filter(browser => browser.fallback);
    locals.unsupported = true;
    view = 'unsupported';
  } else {
    locals.envVars = envVars;
  }

  res.render(view, locals);
});

module.exports = router;
