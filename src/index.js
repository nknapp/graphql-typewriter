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
const graphql_1 = require("graphql");
const render_1 = require("./render");
/**
 * The converter class
 */
class Converter {
    /**
     * Converts a graphQL schema into a TypeScript interface.
     * @param graphqls the source code of the graphQL schema
     * @return a Promise for the TypeScript source code.
     */
    convert(graphqls) {
        return __awaiter(this, void 0, void 0, function* () {
            var schema = graphql_1.buildSchema(graphqls);
            var introSpection = yield graphql_1.graphql(schema, graphql_1.introspectionQuery, {});
            return render_1.renderSchema(introSpection);
        });
    }
}
exports.Converter = Converter;
//# sourceMappingURL=index.js.map