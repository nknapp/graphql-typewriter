import {graphql, buildSchema} from 'graphql'
import {schema} from './graphql/schema/example.graphqls'
import * as fs from 'fs'

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
    buildSchema(fs.readFileSync('graphql/schema/example.graphqls', {encoding: 'utf-8'})),
    '{ person(name:"Joye") { name age friends { name age } }}',
    new Root()
).then((result) => console.log(JSON.stringify(result, null, 2)))
