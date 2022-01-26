#!/usr/bin/env node

const args = process.argv;

if (args.length < 3) {
    console.error(`
usage:
    $ ./ast.js path-to-program-source-file
`
    );

    process.exit(1);
}

const fs = require('fs');
const letterParser = require('./parser');
const src = fs.readFileSync(args[2], 'utf-8');
const ast = letterParser.parse(src);

console.log(
    JSON.stringify(ast, undefined, '  '));
