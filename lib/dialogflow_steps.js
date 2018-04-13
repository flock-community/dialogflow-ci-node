const url = require('path');
const expect = require('chai').expect;

global.fs = require('fs');
global.fetch = require('node-fetch');

const lib = require('../src/lib');

const opts = {
    base: __dirname
};

const queryData = function(query, contexts) {
    return {
        "contexts": contexts,
        "lang": "nl",
        "query": query,
        "sessionId": "12345",
        "timezone": "Netherlands/Amsterdam"
    }
}

const getSpeech = function(data) {
    return data.result.fulfillment.speech;
}

const getIntent = function(data) {
    return data.result.metadata.intentName;
}

module.exports = function() {
    this.World = function World() {
        this.app = undefined;
        this.response = undefined;
    };

    this.Given('ik begin een gesprek met de {string} Google Home applicatie', (application) => {
        const token = process.env.TOKEN;
        this.app = lib(null, token);
    });

    this.When(/^ik zeg "([^"]+)"$/, (sentence) => {
        return this.app.dialogflowQuery(queryData(sentence, []))
            .then(res => { this.response = res });
    });

    this.Then(/^begrijpt (?:ze|de assistente) dat ik de "(.*)" intentie heb$/, (text) => {
        expect(getIntent(this.response)).to.equal(text);
    });

    this.Then(/^begrijpt (?:ze|de assistente) dat ik "(.*)" bedoel$/, (text) => {
        expect(getIntent(this.response)).to.equal(text);
    });

    this.Then(/^(?:zegt|vraagt) (?:ze|de assistente) "(.*)"$/, (text) => {
        expect(getSpeech(this.response)).to.equal(text);
    });

    this.Then(/^(?:ze|de assistente) (?:zegt|vraagt) "(.*)"$/, (text) => {
        expect(getSpeech(this.response)).to.equal(text);
    });
};