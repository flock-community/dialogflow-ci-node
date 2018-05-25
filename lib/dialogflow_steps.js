const url = require('path');
const expect = require('chai').expect;

global.fs = require('fs');
global.fetch = require('node-fetch');

const lib = require('../src/lib');

const queryData = function(query, contexts) {
    return {
        "contexts": contexts,
        "lang": "nl",
        "query": query,
        "sessionId": "12345",
        "timezone": "Netherlands/Amsterdam"
    }
}

const noError = function(func) {
    try {
        func.call;
        return true;
    } catch (_error) {
        return false;
    }
}

const getSpeech = function(data) {
    const fulfillment = data.result.fulfillment;
    if (fulfillment.speech)
        return fulfillment.speech;

    if (fulfillment.messages) {
        let answerFunc = (message) => {
            return message.speech || message.textToSpeech;
        };
        const message = fulfillment.messages.find(answerFunc);
        if (message)
            return answerFunc(message);
    }
    if ((((fulfillment.data || {}).google || {}).richResponse || {}).items) {
        answerFunc = (message) => {
            const res = message.simpleResponse || {};
            return res.speech || res.textToSpeech;
        };
        const message = fulfillment.data.google.richResponse.items.find(answerFunc);
        if (message)
            return answerFunc(message);
    }
    return undefined;
}

const getIntent = function(data) {
    return data.result.metadata.intentName;
}

module.exports = {
    steps: function() {
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
                .then(res => {
                    this.response = res;
                    console.log(`\nResponse to query: '${sentence}'`);
                    console.log(JSON.stringify(res));
                    if (res.status.code != '200')
                        throw res.status.errorDetails;
                });
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
    },
    queryData,
    getIntent,
    getSpeech
};