/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const fs = require('fs');
const syntax = require('syntax-cli');

/**
 *
 * @param {*} programString
 * @param {*} grammar
 * @returns {status, value}
 */
function parse(programString, grammar) {
    const LRParser = syntax.LRParser;

    const parsed = new LRParser({
        grammar: grammar,
        resolveConflicts: undefined
    }).parse(programString);

    return parsed;
}

/**
 *
 * @param {*} grammarFile
 * @returns Grammar
 */
function getGrammar(grammarFile) {
    const Grammar = syntax.Grammar;

    const mode = 'LALR1_BY_SLR1';

    const grammarData = Grammar.dataFromGrammarFile(grammarFile, 'bnf');
    const grammarOptions = {
        /**
         * Parsing mode.
         */
        mode: mode,

        /**
         * Whether to capture locations.
         */
        captureLocations: undefined
    };

    const grammar = Grammar.fromData(grammarData, grammarOptions)
    return grammar;
}

const grammarFile = 'test/resources/01-number.bnf';
const programPath = 'test/resources/01-number-1.xuan';
const programString = fs.readFileSync(programPath, 'utf-8');

const grammar = getGrammar(grammarFile);
const parsed = parse(programString, grammar);

console.log(parsed.status);
console.log(parsed.value);
