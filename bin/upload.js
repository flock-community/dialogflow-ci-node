#! /usr/bin/env node

const path = require('path');
const app = require('../src/index.js');

function upload(path, token) {
    app(path, token).upload()
}

module.exports = upload