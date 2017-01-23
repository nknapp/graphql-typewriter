import {graphql} from 'graphql'
import {schema} from './unions.graphqls'
import * as fs from 'fs'
import {makeExecutableSchema} from 'graphql-tools'

const root: schema.Query<{}> = {
    search: function(args: {q: string}, context: {}): schema.ResultItem<{}>[] {
        return [
            {
                __typename: 'Person',
                firstname: 'abc',
                lastname: 'bcd'
            }
        ]
    }
}

const executableSchema = makeExecutableSchema({
    typeDefs: fs.readFileSync('unions.graphqls', {encoding: 'utf-8'}),
    resolvers: schema.defaultResolvers
})

// Run a query
graphql(
    executableSchema,
    `{
        search(q: "dark") {
            ... on Person {
                firstname
            }
            ... on Organization {
                name
            }
        }
    }`,
    root
).then((result) => console.log(JSON.stringify(result, null, 2)))
