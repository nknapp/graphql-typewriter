# graphql-typewriter 

[![NPM version](https://badge.fury.io/js/graphql-typewriter.svg)](http://badge.fury.io/js/graphql-typewriter)
[![Travis Build Status](https://travis-ci.org/nknapp/gql2ts-for-server.svg?branch=master)](https://travis-ci.org/nknapp/gql2ts-for-server)
[![Coverage Status](https://img.shields.io/coveralls/nknapp/gql2ts-for-server.svg)](https://coveralls.io/r/nknapp/gql2ts-for-server)


> Easy TypeScript interfaces for your GraphQL server


# Installation

```
npm install -g graphql-typewriter
```

### Usage

```
Usage: graphql-typewriter [options]

  Convert all .graphqls schema-files in the current directory tree into typescript
interfaces that can be used to implement a graphql-root for this schema.

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -x, --exclude <dirs>   a list of directories to exclude
    --dont-save-same-file  do not save a file if the contents has not changed. This read each target file prior to loading
```

`graphql-typewriter` is assumed to be run in the root folder of a npm-project.
It finds all .graphqls files recursively and adds a .graphqls.ts file next each file
(excluding the `node_modules`-folder).

The source GraphQL-schema `example.graphqls` that looks like

```graphql

# The base query
type Query {
    # Retrieve a person by name
    person(name:String): Person
}

# A type describing a person
type Person {
    # The persons name
    name: String!
    # The persons age in years
    age: Int!
    # Friendship relations to other persons
    friends: [Person!]
}

```


will be converted into the following `example.graphqls.ts`:

```ts
/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result, Ctx> = Result | Promise<Result> | ((args: Args, context: Ctx) => Result | Promise<Result>)

    /**
     * The base query
     */
    export interface Query<Ctx> {
        /**
         * Retrieve a person by name
         */
        person?: Resolver<{name: string}, Person<Ctx> | undefined, Ctx>
    }

    /**
     * A type describing a person
     */
    export interface Person<Ctx> {
        /**
         * The persons name
         */
        name: Resolver<{}, string, Ctx>
        /**
         * The persons age in years
         */
        age: Resolver<{}, number, Ctx>
        /**
         * Friendship relations to other persons
         */
        friends?: Resolver<{}, Person<Ctx>[] | undefined, Ctx>
    }
}
```


Note that all the field (non-argument) types can either be

* the actual type (`Person`),
* a promise for the actual type (`Promise<Person>`),
* a function generating the actual type (`(): Person`), or
* a function generating a Promise (`(): Promise<Person>`)  

For fields with arguments, only the latter two apply.

With this interface, you can write the following program (`example-usage.ts`):

```ts
import {graphql, buildSchema} from 'graphql'
import {schema} from './graphql/schema/example.graphqls'
import * as fs from 'fs'

type Context = {
    year: number
}

// Implement the generated interface
class Root implements schema.Query<Context> {
    person(args: {name: string}) {
        return new Person(args.name, 1981)
    }
}

class Person implements schema.Person<Context> {
    name: string
    yearOfBirth: number

    constructor(name: string, yearOfBirth: number) {
        this.name = name
        this.yearOfBirth = yearOfBirth
    }

    age(_, context: Context) {
        return context.year - this.yearOfBirth
    }

    async friends(): Promise<Person[]> {
        return Promise.resolve([
            new Person(this.name + "'s first friend", this.yearOfBirth - 1),
            new Person(this.name + "'s second friend", this.yearOfBirth - 2)
        ])
    }
}

// Run a query
graphql(
    buildSchema(fs.readFileSync('graphql/schema/example.graphqls', {encoding: 'utf-8'})),
    '{ person(name:"Joye") { name age friends { name age } }}',
    new Root(),
    {year: 2017}
).then((result) => console.log(JSON.stringify(result, null, 2)))

```


The program uses the interface to build an root-implementation that can be validate 
by Typescript (Promise validation works with TypeScript 2.1 onwards).

The output of this program is 

```
{
  "data": {
    "person": {
      "name": "Joye",
      "age": 36,
      "friends": [
        {
          "name": "Joye's first friend",
          "age": 37
        },
        {
          "name": "Joye's second friend",
          "age": 38
        }
      ]
    }
  }
}
```



## License

`graphql-typewriter` is published under the MIT-license. 
See [LICENSE.md](LICENSE.md) for details.

## Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
## Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).