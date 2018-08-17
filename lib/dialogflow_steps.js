const url = require('path');
const expect = require('chai').expect;

global.fs = require('fs');
global.fetch = require('node-fetch');

const lib = require('../src/lib');
const responseHelper = require('../src/response_helper');

const startConversation = (application) => {
    this.app = lib();
}

const say = (sentence) => {
    return this.app.dialogflowQuery(sentence, [])
        .then(res => {
            this.response = res;
        });
}

module.exports = {
    steps: function() {
        this.World = function World() {
            this.app = undefined;
            this.response = undefined;
        };

        this.Given('ik begin een gesprek met de {string} Google Home applicatie', (application) => {
            startConversation(application);
        });

        this.Given('I start a conversation with the {string} Google Home application', (application) => {
            startConversation(application);
        });

        this.When(/^ik zeg "([^"]+)"$/, (sentence) => {
            return say(sentence);
        });

        this.When(/^I say "([^"]+)"$/, (sentence) => {
            return say(sentence);
        });

        this.Then(/^begrijpt (?:ze|de assistente) dat ik de "(.*)" intentie heb$/, (text) => {
            expect(responseHelper.getIntent(this.response)).to.equal(text);
        });

        this.Then(/^(?:she|the assistent) understands that I have the "(.*)" intention$/, (text) => {
            expect(responseHelper.getIntent(this.response)).to.equal(text);
        });

        this.Then(/^begrijpt (?:ze|de assistente) dat ik "(.*)" bedoel$/, (text) => {
            expect(responseHelper.getIntent(this.response)).to.equal(text);
        });

        this.Then(/^(?:she|the assistent) understands that I mean "(.*)"$/, (text) => {
            expect(responseHelper.getIntent(this.response)).to.equal(text);
        });

        this.Then(/^(?:zegt|vraagt) (?:ze|de assistente) "(.*)"$/, (text) => {
            expect(responseHelper.getSpeech(this.response)).to.equal(text);
        });

        this.Then(/^(?:ze|de assistente) (?:zegt|vraagt) "(.*)"$/, (text) => {
            expect(responseHelper.getSpeech(this.response)).to.equal(text);
        });

        this.Then(/^(?:she|the assistent) (?:says|asks) "(.*)"$/, (text) => {
            expect(responseHelper.getSpeech(this.response)).to.equal(text);
        });
    },
    responseHelper
};