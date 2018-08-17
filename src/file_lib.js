const glob = require('glob-promise');
const fs = require('fs-extra');
const AdmZip = require('adm-zip');

const lib = (baseDir) => {
    return {
        fileList: (source) => {
            return glob(`${baseDir}/${source}/*.json`)
                .then(files => files
                    .map(file => fs.readJson(file)))
                .then(x => Promise.all(x))
        },

        fileWrite: (source, data) => {
            return fileWriteName(`${source}/${data.name}`, data);
        },

        fileDelete: (source, data) => {
            const file = `${baseDir}/${source}/${data.name}.json`;
            return fs.remove(file)
        },

        fileWriteName: (fileName, data) => {
            if (!fs.existsSync(`${baseDir}/intents`))
                fs.mkdirSync(`${baseDir}/intents`);
            if (!fs.existsSync(`${baseDir}/entities`))
                fs.mkdirSync(`${baseDir}/entities`);

            const file = `${baseDir}/${fileName}`;
            return fs.writeJson(file, data, {
                spaces: 4
            })
        },

        extractZip: (zip) => {
            zip.extractAllTo(baseDir, true);
        },

        createZip: () => {
            const zip = new AdmZip();
            zip.addLocalFolder(baseDir);
            return zip;
        }
    }
}

module.exports = lib;