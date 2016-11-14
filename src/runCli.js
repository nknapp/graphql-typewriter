"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const glob = require("glob");
const index_1 = require("./index");
const mfs = require('m-io/fs');
function readFile(sourceFile) {
    return __awaiter(this, void 0, void 0, function* () {
        return mfs.read(sourceFile, { encoding: 'utf-8' });
    });
}
const converter = new index_1.Converter();
function convertSchema(source, sourceFile, targetFile, cliArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ts = yield converter.convert(source);
            if (cliArgs.dontSaveSameFile) {
                const oldContents = yield mfs.read(targetFile);
                if (oldContents === ts) {
                    console.log(`${sourceFile} -> ${targetFile}`, 'success');
                    return;
                }
            }
            yield mfs.write(targetFile, ts);
            console.log(`${sourceFile} -> ${targetFile}`, 'success');
        }
        catch (e) {
            console.log(`${sourceFile} -> ${targetFile}`, e);
        }
    });
}
function runCli(cliArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        // Remove default value from 'exclude', if explicit values have been provided
        if (cliArgs.exclude.length > 1) {
            cliArgs.exclude.shift();
        }
        const files = glob.sync('**/*.graphqls', {
            ignore: cliArgs.exclude
        });
        if (!cliArgs.out) {
            yield files.map((sourceFile) => __awaiter(this, void 0, void 0, function* () {
                const source = yield readFile(sourceFile);
                const targetFile = `${sourceFile}.ts`;
                convertSchema(source, sourceFile, targetFile, cliArgs);
            }));
        }
        else {
            let fileContent = '';
            for (let file of files) {
                fileContent += yield readFile(file);
            }
            yield convertSchema(fileContent, files.join(','), `${cliArgs.out}.ts`, cliArgs);
        }
        console.log('Done');
    });
}
exports.runCli = runCli;
//# sourceMappingURL=runCli.js.map