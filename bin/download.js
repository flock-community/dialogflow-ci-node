#! /usr/bin/env node
const path = require('path');
const app = require('../src/index.js');

function download(path, token) {
  app(path, token).download()
}

module.exports = download