const express = require('express');
const indexRoutes = require('./routes/index');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.get('/', indexRoutes);
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/', express.static(__dirname + '/../dist'));
app.use('/*', indexRoutes);

const server = app.listen(port);
