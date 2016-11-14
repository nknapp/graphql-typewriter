#!/usr/bin/env node
"use strict";
const program = require("commander");
const runCli_1 = require("../src/runCli");
function stringArray(arg, message) {
    if (!arg) {
        throw new Error(message + ": Value not set");
    }
    if (arg instanceof Array && arg.length === 0 || typeof arg[0] === 'string') {
        return arg;
    }
    throw new Error(message + ": Not a string[]");
}
program.version(require('../package.json').version)
    .description('Convert all .graphqls schema-files in the current directory tree into typescript\n' +
    'interfaces that can be used to implement a graphql-root for this schema.')
    .option('-x, --exclude <dirs>', 'a list of directories to exclude', (current, last) => {
    return last.concat([current]);
}, ['node_modules'])
    .option('--dont-save-same-file', 'do not save a file if the contents has not changed. This read each target file prior to loading')
    .option('--out [value]', 'concat all schema files into one gathering the types in one single Ts file')
    .parse(process.argv);
runCli_1.runCli({
    exclude: stringArray(program['exclude'], "Verification of 'exclude'-parameter"),
    dontSaveSameFile: Boolean(program['dontSaveSameFile']),
    out: program['out']
});
//# sourceMappingURL=gql2ts-for-server.js.map
