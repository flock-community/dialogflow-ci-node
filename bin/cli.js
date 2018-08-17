#! /usr/bin/env node

const path = require('path');
const program = require('commander');

const download = require('./download.js');
const upload = require('./upload.js');

program
    .option('--no-sauce', 'Remove sauce')

program
    .command('download <dir>')
    .option('-r, --recursive', 'Remove recursively')
    .action(function(dir, token, cmd) {
        const baseDir = path.join(process.cwd(), dir)
        download(baseDir)
    })

program
    .command('upload <dir>')
    .option('-r, --recursive', 'Remove recursively')
    .action(function(dir, cmd) {
        const baseDir = path.join(process.cwd(), dir)
        upload(baseDir)
    })

program
    .parse(process.argv);

console.log('DONE')