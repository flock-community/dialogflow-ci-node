const app = function(dirName, token) {

    const fileLib = require('../file_lib.js')(dirName);
    const lib = require('./lib.js')(token);

    const listResult = (source) => {
        return Promise.all([fileLib.fileList(source), lib.dialogflowList(source)])
            .then(res => {

                const [files, dialogflow] = res;

                const update = files
                    .filter(x => dialogflow.find(y => y.name === x.name))
                    .map(x => {
                        return {
                            from: dialogflow.find(y => y.name === x.name),
                            to: x
                        }
                    });
                const create = files
                    .filter(x => !dialogflow.find(y => y.name === x.name))
                    .map(x => {
                        return {
                            to: x
                        }
                    });
                const remove = dialogflow
                    .filter(x => !files.find(y => y.name === x.name))
                    .map(x => {
                        return {
                            from: x
                        }
                    });

                return [].concat(update, create, remove)
            })
    };


    const upload = (source) => listResult(source)
        .then(list => list
            .map(x => {
                if (x.from && x.to) {
                    return lib.dialogflowUpdate(source, x.from.id, x.to);
                }
                if (x.to) {
                    return lib.dialogflowCreate(source, x.to);
                }
                if (x.from) {
                    console.log('Delete', x.from.id, x.from.name)
                    return lib.dialogflowDelete(source, x.from.id);
                }
            })
        )
        .then(x => Promise.all(x))
        .then(console.log)
        .catch(console.error);

    const download = (source) => listResult(source)
        .then(list => list
            .map(x => {
                if (x.from && x.to) {
                    return fileLib.fileWrite(source, x.from);
                }
                if (x.to) {
                    return fileLib.fileDelete(source, x.to);
                }
                if (x.from) {
                    return fileLib.fileWrite(source, x.from);
                }
            })
        )
        .then(x => Promise.all(x))
        .then(console.log)
        .catch(console.error);

    return {
        upload: () => {
            upload('intents')
            upload('entityTypes')
        },
        download: () => {
            download('intents')
            download('entityTypes')
        }
    }
}

module.exports = app;