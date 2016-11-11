/*!
 * tsql <https://github.com/nknapp/tsql>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/* global describe */
// /* global it */
// /* global xdescribe */
// /* global xit */
const index_1 = require("../src/index");
const path = require("path");
const fs = require("fs");
const chai_1 = require("chai");
var converter = new index_1.Converter();
function fixture(filename) {
    return path.join(__dirname, 'schemas', filename);
}
function store(file, code) {
    return fs.writeFileSync(file, code);
}
function read(file) {
    return fs.readFileSync(file, { encoding: 'utf-8' });
}
describe('tsql:', function () {
    // Automatic generation of tests from the testcases-directory
    fs.readdirSync(path.join(__dirname, 'schemas'))
        .filter((file) => file.match(/\.graphqls$/))
        .forEach((file) => {
        it(`should handle ${file} correctly`, function () {
            return __awaiter(this, void 0, void 0, function* () {
                var source = fixture(file);
                var target = source.replace(/\.graphqls$/, '.ts');
                var result = yield converter.convert(read(source));
                // If the target file does not exist yet, we write it
                // with a short disclaimer, so that the test does not pass
                if (!fs.existsSync(target)) {
                    store(target, `// Please check this result\n${result}`);
                }
                chai_1.expect(result).to.equal(read(target));
            });
        });
    });
});
//# sourceMappingURL=converter-spec.js.map