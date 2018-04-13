#! /usr/bin/env node
const path = require('path');
const program = require('commander');

const download = require('./download.js');

program
  .option('--no-sauce', 'Remove sauce')

program
  .command('download <dir> <token>')
  .option('-r, --recursive', 'Remove recursively')
  .action(function (dir, token, cmd) {
    const baseDir = path.join(process.cwd(), dir)
    download(baseDir, token)
  })

program
  .parse(process.argv);

console.log('YOLO')