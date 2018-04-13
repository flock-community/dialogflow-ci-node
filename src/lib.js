const fs = require('fs-extra');

const glob = require('glob-promise');
const fetch = require('node-fetch');

const BASE_URL = 'https://api.dialogflow.com/v1';

const API_VERSION = "20150910";

const lib = (baseDir, token) => {
  return {
    fileList: (source) => {
      return glob(`${baseDir}/${source}/*.json`)
        .then(files => files
          .map(file => fs.readJson(file)))
        .then(x => Promise.all(x))
    },

    fileWrite: (source, data) => {
      const file = `${baseDir}/${source}/${data.name}.json`;
      return fs.writeJson(file, data, {spaces: 4})
    },

    fileDelte: (source, data) => {
      const file = `${baseDir}/${source}/${data.name}.json`;
      return fs.remove(file)
    },

    dialogflowList: (source) => {
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      const url = `${BASE_URL}/${source}?v=${API_VERSION}`
      return fetch(url, options)
        .then(x => x.json())
        .then(x => x
          .map(y => y.id)
          .map(id => {
            const url = `${BASE_URL}/${source}/${id}?v=${API_VERSION}`
            return fetch(url, options)
              .then(x => x.json())
          }))
        .then(x => Promise.all(x))
        .catch(console.error)
    },

    dialogflowCreate: (source, data) => {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const url = `${BASE_URL}/${source}?v=${API_VERSION}`
      return fetch(url, options)
        .then(x => x.json())
    },

    dialogflowUpdate: (source, id, data) => {
      const options = {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const url = `${BASE_URL}/${source}/${id}?v=${API_VERSION}`
      return fetch(url, options)
        .then(x => x.json())
    },

    dialogflowDelete: (source, id) => {
      console.log(source, id)
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      const url = `${BASE_URL}/${source}/${id}?v=${API_VERSION}`
      console.log(url)
      return fetch(url, options)
        .then(x => x.json())
    },

    dialogflowQuery: (data) => {
      console.log(data);
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const url = `${BASE_URL}/query?v=${API_VERSION}`
      console.log(url);
      return fetch(url, options)
        .then(x => x.json())
    }
  }
};

module.exports = lib;