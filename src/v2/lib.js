const fs = require('fs-extra');
const fetch = require('node-fetch');

const BASE_URL = 'https://dialogflow.googleapis.com/v2';

const lib = (token) => {
    return {
        dialogflowList: (source) => {
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const url = `${BASE_URL}/projects/${token}/agent/${source}`
            console.log(url);
            return fetch(url, options)
                .then(x => x.json())
                .then(x => console.log(x))
                .catch(console.error);
        },

        dialogflowCreate: (source, data) => {},

        dialogflowUpdate: (source, id, data) => {},

        dialogflowDelete: (source, id) => {},

        dialogflowQuery: (data) => {}
    }
};

module.exports = lib;