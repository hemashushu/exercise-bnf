#!/usr/bin/env node

let args = process.argv;

if (args.length < 4) {
    console.log(
        `
usage:
    $ ./manual-check.js path-to-grammar.bnf path-to-program.file

e.g.
    $ ./manual-check.js test/resources/01-number.bnf test/resources/01-number.xuan
`);
    process.exit(1);
}

let grammarFilePath = args[2];
let programFilePath = args[3];

// check program string
// npm exec syntax-cli -- --grammar bnf/grammar.bnf --mode LALR1 --parse '1 + 2 * 3'

// check program file
let command = `npm exec syntax-cli -- --mode LALR1 --grammar "${grammarFilePath}" --file "${programFilePath}"`;

console.log(command);

const { exec, spawn } = require('child_process');
exec(command, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});
