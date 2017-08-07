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
import { expect } from 'chai'
import { buildSchema, graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import {schema as simpleSchema } from './schemas/simpleSchema'
import {schema as argumentSchema } from './schemas/arguments'
import {schema as unionSchema } from './schemas/union'
import {schema as interfaceSchema } from './schemas/interface'

function fixture (filename) {
    return path.join(__dirname, 'schemas', filename)
}
function read (file) {
    return fs.readFileSync(file, {encoding: 'utf-8'})
}

describe('The simple schema', function () {

    // Automatic generation of tests from the testcases-directory
    it('should be possible to use with graphql', async function () {
        const schema = buildSchema(read(fixture('simpleSchema.graphqls')))

        const root: simpleSchema.Query<{}> = {
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
    const root: argumentSchema.Query<{}> = {
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

describe('The union schema (with graphql-tools)', async function () {
    const schema = makeExecutableSchema({
        typeDefs: read(fixture('union.graphqls')),
        resolvers: unionSchema.defaultResolvers
    })
    const root = new class Query implements unionSchema.Query<{}> {
        single () {
            return {
                __typename: 'A' as 'A',
                aName: 'Hi there!'
            }
        }

        aOrB (args: {a: number}) {
            if (args.a % 2 === 0) {
                return {
                    __typename: 'A' as 'A',
                    aName: 'This is A'
                }
            } else {
                return {
                    __typename: 'B' as 'B',
                    bName: 'This is B'
                }
            }
        }
    }()

    it('Test with single value union', async function () {
        const result = await graphql(
            schema,
            `{
                single { ... on A { aName } }
            }`,
            root)
        expect(result, 'Checking union-schema with single value').to.deep.equal({
            data: {
                single: {
                    aName: 'Hi there!'
                }
            }
        })
    })

    it('Test with multi value union to A', async function () {
        const result = await graphql(
            schema,
            `{
                aOrB(a: 0) { ... on A { aName } ... on B { bName } }
            }`,
            root)
        expect(result, 'Checking union-schema with multi value (A)').to.deep.equal({
            data: {
                aOrB: {
                    aName: 'This is A'
                }
            }
        })
    })

    it('Test with multi value union to B', async function () {
        const result = await graphql(
            schema,
            `{
                aOrB(a: 1) { ... on A { aName } ... on B { bName } }
            }`,
            root)
        expect(result, 'Checking union-schema with multi value (B)').to.deep.equal({
            data: {
                aOrB: {
                    bName: 'This is B'
                }
            }
        })
    })
})

describe('The interface schema (with graphql-tools)', async function () {
    const schema = makeExecutableSchema({
        typeDefs: read(fixture('interface.graphqls')),
        resolvers: interfaceSchema.defaultResolvers
    })
    const root = new class Query implements interfaceSchema.Query<{}> {
        characters () {
            return [
                {
                    __typename: 'Human' as 'Human',
                    id: '1',
                    name: 'Hans',
                    friends: [{
                        __typename: 'Human' as 'Human',
                        id: '2',
                        name: 'Marry',
                        friends: []
                    }, {
                        __typename: 'Droid' as 'Droid',
                        id: '3',
                        name: 'Mr Robot',
                        primaryFunction: 'music'
                    }]
                }
            ]
        }
    }()

    it('Test with array', async function () {
        const result = await graphql(
            schema,
            `{
                characters {
                    ... on Human {
                        name
                        friends {
                            ... on Human { name }
                            ... on Droid { name, primaryFunction }
                        }
                    }
                    ... on Droid {
                        name
                    }
                }
            }`,
            root)
        expect(result, 'Checking union-schema with single value').to.deep.equal({
            data: {
                characters: [{
                    name: 'Hans',
                    friends: [{
                        name: 'Marry'
                    }, {
                        name: 'Mr Robot',
                        primaryFunction: 'music'
                    }]
                }]
            }
        })
    })
})
