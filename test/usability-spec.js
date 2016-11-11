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
const path = require("path");
const fs = require("fs");
const chai_1 = require("chai");
const graphql_1 = require("graphql");
function fixture(filename) {
    return path.join(__dirname, 'schemas', filename);
}
function store(file, code) {
    return fs.writeFileSync(file, code);
}
function read(file) {
    return fs.readFileSync(file, { encoding: 'utf-8' });
}
describe('The simple schema', function () {
    // Automatic generation of tests from the testcases-directory
    it('should be possible to use with graphql', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var schema = graphql_1.buildSchema(read(fixture('simpleSchema.graphqls')));
            var root = {
                field1: {
                    name: 'abc',
                    size: () => 4,
                },
                field2: Promise.resolve({
                    nested: [
                        {
                            name: () => 'cde',
                            size: () => Promise.resolve(3)
                        }
                    ]
                })
            };
            var result = yield graphql_1.graphql(schema, `
                {
                    field1 {
                        name
                        size
                    }
                    field2 {
                        nested {
                            name
                            size
                        }
                    }
                }`, root);
            chai_1.expect(result, "Checking simple schema result").to.deep.equal({
                data: {
                    field1: {
                        name: 'abc',
                        size: 4
                    },
                    field2: {
                        nested: [{
                                name: 'cde',
                                size: 3
                            }]
                    }
                }
            });
        });
    });
});
describe('The arguments schema', function () {
    return __awaiter(this, void 0, void 0, function* () {
        var schema = graphql_1.buildSchema(read(fixture('arguments.graphqls')));
        var root = {
            field1: (args) => {
                return args.a + " " + args.b;
            }
        };
        it('Test with default argument', function () {
            return __awaiter(this, void 0, void 0, function* () {
                var result = yield graphql_1.graphql(schema, `
                {
                    field1(a:"b")
                }`, root);
                chai_1.expect(result, "Checking arguments-schema with default argument").to.deep.equal({
                    data: {
                        field1: "b 3"
                    }
                });
            });
        });
        it('Test with explicit argument', function () {
            return __awaiter(this, void 0, void 0, function* () {
                var result = yield graphql_1.graphql(schema, `
                {
                    field1(a:"b",b:4)
                }`, root);
                chai_1.expect(result, "Checking arguments-schema with default argument").to.deep.equal({
                    data: {
                        field1: "b 4"
                    }
                });
            });
        });
    });
});
//# sourceMappingURL=usability-spec.js.map