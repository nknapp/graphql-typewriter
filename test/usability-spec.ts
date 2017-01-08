/*!
 * gql2ts-for-server <https://github.com/nknapp/gql2ts-for-server>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
// /* global it */
// /* global xdescribe */
// /* global xit */

import path = require('path')
import fs = require('fs')
import {expect} from 'chai'
import {buildSchema, graphql} from 'graphql'
import {schema as simpleSchema} from './schemas/simpleSchema'
import {schema as argumentSchema} from './schemas/arguments'

function fixture(filename) {
    return path.join(__dirname, 'schemas', filename)
}
function read(file) {
    return fs.readFileSync(file, {encoding: 'utf-8'})
}

describe('The simple schema', function () {

    // Automatic generation of tests from the testcases-directory
    it('should be possible to use with graphql', async function () {
        const schema = buildSchema(read(fixture('simpleSchema.graphqls')))

        const root: simpleSchema.Query = {
            field1: {
                name: 'abc',
                size: () => 4
            },
            field2: Promise.resolve({
                nested: [
                    {
                        name: () => 'cde',
                        size: () => Promise.resolve(3)
                    }
                ]
            })
        }
        const result = await graphql(
            schema,
            `{
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
            }`,
            root)
        expect(result, 'Checking simple schema result').to.deep.equal({
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
        })
    })
})

describe('The arguments schema', async function () {
    const schema = buildSchema(read(fixture('arguments.graphqls')))
    const root: argumentSchema.Query = {
        field1: (args: {a: string, b: number}) => {
            return args.a + ' ' + args.b
        }
    }

    it('Test with default argument', async function () {
        const result = await graphql(
            schema,
            `{
                field1(a:"b")
            }`,
            root)

        expect(result, 'Checking arguments-schema with default argument').to.deep.equal({
            data: {
                field1: 'b 3'
            }
        })
    })

    it('Test with explicit argument', async function () {
        const result = await graphql(
            schema,
            `{
                field1(a:"b",b:4)
            }`,
            root)

        expect(result, 'Checking arguments-schema with default argument').to.deep.equal({
            data: {
                field1: 'b 4'
            }
        })
    })

})
