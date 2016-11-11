/*!
 * tsql <https://github.com/nknapp/tsql>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */
/**
 * The converter class
 */
export declare class Converter {
    /**
     * Converts a graphQL schema into a TypeScript interface.
     * @param graphqls the source code of the graphQL schema
     * @return a Promise for the TypeScript source code.
     */
    convert(graphqls: string): Promise<string>;
}
