const version = require('./version')();

module.exports = (token) => {
    return require(`./${version}/lib.js`)(token)
}