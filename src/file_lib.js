const glob = require('glob-promise');
const fs = require('fs-extra');

const lib = (baseDir) => {
    return {
        fileList: (source) => {
            return glob(`${baseDir}/${source}/*.json`)
                .then(files => files
                    .map(file => fs.readJson(file)))
                .then(x => Promise.all(x))
        },

        fileWrite: (source, data) => {
            const file = `${baseDir}/${source}/${data.name}.json`;
            return fs.writeJson(file, data, {
                spaces: 4
            })
        },

        fileDelete: (source, data) => {
            const file = `${baseDir}/${source}/${data.name}.json`;
            return fs.remove(file)
        }
    }
}

module.exports = lib;