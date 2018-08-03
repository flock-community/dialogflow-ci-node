const url = require('path');
const expect = require('chai').expect;

global.fs = require('fs');
global.fetch = require('node-fetch');

const lib = require('../src/lib');
const responseHelper = require('../src/response_helper');

module.exports = {
    steps: function() {
        this.World = function World() {
            this.app = undefined;
            this.response = undefined;
        };

        this.Given('ik begin een gesprek met de {string} Google Home applicatie', (application) => {
            this.app = lib();
        });

        this.When(/^ik zeg "([^"]+)"$/, (sentence) => {
            return this.app.dialogflowQuery(sentence, [])
                .then(res => {
                    this.response = res;
                });
        });

        this.Then(/^begrijpt (?:ze|de assistente) dat ik de "(.*)" intentie heb$/, (text) => {
            expect(responseHelper.getIntent(this.response)).to.equal(text);
        });

        this.Then(/^begrijpt (?:ze|de assistente) dat ik "(.*)" bedoel$/, (text) => {
            expect(responseHelper.getIntent(this.response)).to.equal(text);
        });

        this.Then(/^(?:zegt|vraagt) (?:ze|de assistente) "(.*)"$/, (text) => {
            expect(responseHelper.getSpeech(this.response)).to.equal(text);
        });

        this.Then(/^(?:ze|de assistente) (?:zegt|vraagt) "(.*)"$/, (text) => {
            expect(responseHelper.getSpeech(this.response)).to.equal(text);
        });
    },
    responseHelper
};