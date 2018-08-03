const version = require('./version')();

module.exports = require(`./${version}/lib.js`);