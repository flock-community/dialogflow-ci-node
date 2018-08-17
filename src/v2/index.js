const app = function(dirName) {

    const fileLib = require('../file_lib.js')(dirName);
    const lib = require('./lib.js')(token);

    const upload = () => {
        const zip = fileLib.createZip();
        lib.dialogflowUpload(zip);
    }

    const download = () => {
        lib.dialogflowDownload().then(zip => {
            fileLib.extractZip(zip);
        });
    }

    return {
        upload,
        download
    }
}

module.exports = app;