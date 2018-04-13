const url = require('path');
const expect = require('chai').expect;

global.fs = require('fs');
global.fetch = require('node-fetch');

const opts = {
    base: __dirname
};

module.exports = function() {
    this.World = function World() {};

    this.Given(/^Ik begin een gesprek met de (.*) Google Home applicatie$/, (application) => {
        // Start
    });

    this.When(/^(?:zeg ik)|(?:ik zeg) "([^"]+)"$/, (sentence) => {
        // query sentence
        // store response
    });

    this.Then(/^vraagt de assistente waarom ik dat wil weten$/, () => {
        // check whether response matches one of the possible responses for the intent 
    });

    this.Then(/^zegt de assistente "(.*)"$/, (text) => {
        // check whether response matches the given text
    });
};