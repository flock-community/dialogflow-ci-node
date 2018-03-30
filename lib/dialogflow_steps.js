const url = require('path');
const expect = require('chai').expect;

global.fs = require('fs');
global.fetch = require('node-fetch');

const opts = {
    base: __dirname
};

module.exports = function() {
    this.World = function World() {};

    this.Given(/^Ik begin een gesprek met de Bol.com Google Home applicatie$/, () => {
        // Start
    });

    this.When(/^(?:zeg ik)|(?:ik zeg) "([^"]+)"$/, (sentence) => {
        // query sentence
        // store response
    });

    this.Then(/^vraagt de assistente hoeveel geld je wilt besteden$/, () => {
        // check whether response matches one of the possible responses for the "cadeau" intent 
    });

    this.Then(/^stelt de assistente voor om een cadeaubon te geven$/, () => {
        // check whether response matches one of the possible responses for the "budget" intent 
    });
};