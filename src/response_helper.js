const version = require('./version')();

module.exports = require(`./${version}/response_helper.js`)