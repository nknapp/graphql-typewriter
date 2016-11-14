# gql2ts-for-server 

[![NPM version](https://badge.fury.io/js/gql2ts-for-server.svg)](http://badge.fury.io/js/gql2ts-for-server)
[![Travis Build Status](https://travis-ci.org/nknapp/gql2ts-for-server.svg?branch=master)](https://travis-ci.org/nknapp/gql2ts-for-server)
[![Coverage Status](https://img.shields.io/coveralls/nknapp/gql2ts-for-server.svg)](https://coveralls.io/r/nknapp/gql2ts-for-server)


> Easy TypeScript interfaces for your GraphQL server


# Installation

```
npm install -g gql2ts-for-server
```

### Usage

```
Usage: gql2ts-for-server [options]

  Convert all .graphqls schema-files in the current directory tree into typescript
interfaces that can be used to implement a graphql-root for this schema.

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -x, --exclude <dirs>   a list of directories to exclude
    --dont-save-same-file  do not save a file if the contents has not changed. This read each target file prior to loading
```

`gql2ts-for-server` is assumed to be run in the root folder of a npm-project.
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
    name: String
    # The persons age in years
    age: Int
    # Friendship relations to other persons
    friends: [Person]
} 

```


will be converted into the following `example.graphqls.ts`:

```ts
export namespace schema {
    /**
     * The base query 
     */
    export interface Query {
        /**
         * Retrieve a person by name 
         */
        person(args: {name: string}): Person | Promise<Person>
    }

    /**
     * A type describing a person
     */
    export interface Person {
        /**
         * The persons name
         */
        name: string | Promise<string> | { (): string } | { (): Promise<string> }
        /**
         * The persons age in years
         */
        age: number | Promise<number> | { (): number } | { (): Promise<number> }
        /**
         * Friendship relations to other persons
         */
        friends: Person[] | Promise<Person[]> | { (): Person[] } | { (): Promise<Person[]> }
    }
}

```


Note that all the field (non-argument) types can either be

* the actual type (`Person`),
* a promise for the actual type (`Promise&lt;Person>`),
* a function generating the actual type (`(): Person`), or
* a function generating a Promise (`(): Promise&lt;Person>`)  

For fields with arguments, only the latter two apply.

With this interface, you can write the following program (`example-usage.ts`):

```ts
import {graphql, buildSchema}  from 'graphql'
import {schema} from './graphql/schema/example.graphqls'
import fs = require('fs')

// Implement the generated interface
class Root implements schema.Query {
    person(args: {name: string}): schema.Person|Promise<schema.Person> {
        return new Person(args.name, 10)
    }
}

class Person implements schema.Person {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    async friends(): Promise<Person[]> {
        return Promise.resolve([
            new Person(this.name + "'s first friend", this.age + 1),
            new Person(this.name + "'s second friend", this.age + 2)
        ])
    }
}

// Run a query
graphql(
    buildSchema(fs.readFileSync('graphql/schema/example.graphqls', { encoding: 'utf-8' })),
    '{ person(name:"Joye") { name age friends { name age } }}',
    new Root()
).then((result) => console.log(JSON.stringify(result,null,2)))

```


The program uses the interface to build an root-implementation that can be validate 
by Typescript (Promise validation works with TypeScript 2.1 onwards).

The output of this program is 

```
{
  "data": {
    "person": {
      "name": "Joye",
      "age": 10,
      "friends": [
        {
          "name": "Joye's first friend",
          "age": 11
        },
        {
          "name": "Joye's second friend",
          "age": 12
        }
      ]
    }
  }
}
```



## License

`gql2ts-for-server` is published under the MIT-license. 
See [LICENSE.md](LICENSE.md) for details.

## Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
## Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).