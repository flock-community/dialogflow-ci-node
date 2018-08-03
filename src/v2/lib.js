const fetch = require('node-fetch');
const fs = require('fs-extra');
const uuidv1 = require('uuid/v1');

const BASE_URL = 'https://dialogflow.googleapis.com/v2';

const queryData = function(query, contexts) {
    return {
        "queryParams": {
            "timeZone": 'Netherlands/Amsterdam',
            "contexts": contexts
        },
        "queryInput": {
            "text": {
                "text": query,
                "languageCode": 'nl'
            }
        }
    }
}


const lib = () => {
    const sessionId = uuidv1();
    const token = process.env.TOKEN;
    const id = process.env.ID;

    return {
        dialogflowList: (source) => {
            var url = `${BASE_URL}/projects/${id}/agent/${source}`;

            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            return fetch(url, options)
                .then(x => x.json())
                .then(x => x.intents);
        },

        dialogflowCreate: (source, data) => {},

        dialogflowUpdate: (source, id, data) => {},

        dialogflowDelete: (source, id) => {},

        dialogflowQuery: (query, contexts) => {
            const url = `${BASE_URL}/projects/${id}/agent/sessions/${sessionId}:detectIntent`
            const data = queryData(query, contexts);
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            };

            return fetch(url, options)
                .then(x => {
                    console.log(`\nResponse to query: '${query}'`);
                    console.log(x);
                    return x.json();
                })
                .then(x => {
                    console.log(`Json data:\n${JSON.stringify(x)}`);
                    return Promise.resolve(x);
                });
        }
    }
};

module.exports = lib;