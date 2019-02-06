const envVars = require('../config');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { envVars });
});

module.exports = router;
