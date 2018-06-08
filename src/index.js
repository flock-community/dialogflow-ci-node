const version = require('./version')();

module.exports = require(`./${version}/index.js`);