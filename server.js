/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-30
 */

var path = require('path');
var express = require('express');
var jsonServer = require('json-mock-kuitos');
var webpack = require('webpack');
var config = require('./webpack-dev.config');

var app = jsonServer.create();
var compiler = webpack(config);

var apiPrefix = '';
var filename = process.cwd() + '/src/mock/db.json';

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo    : false,
  stats     : {
    colors: true,
    cached: false
  },
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(jsonServer.defaults({static: process.cwd() + '/'}));
app.use(jsonServer.router(apiPrefix, filename));

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
