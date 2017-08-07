/*!
 * gql2ts-for-server <https://github.com/nknapp/gql2ts-for-server>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

import { graphql, introspectionQuery, buildSchema } from 'graphql'
import { Renderer } from './render'

/**
 * The converter class
 */
export class Converter {
    /**
     * Converts a graphQL schema into a TypeScript interface.
     * @param graphqls the source code of the graphQL schema
     * @return a Promise for the TypeScript source code.
     */
    public async convert (graphqls: string): Promise<string> {
        const schema: any = buildSchema(graphqls)
        const renderer = new Renderer({})
        const introSpection: any = await graphql(schema, introspectionQuery, {})
        return renderer.render(introSpection)
    }
}
