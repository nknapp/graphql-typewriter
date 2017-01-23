import {graphql, buildSchema} from 'graphql'
import {schema} from './simple-example.graphqls'
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
    buildSchema(fs.readFileSync('simple-example.graphqls', {encoding: 'utf-8'})),
    '{ person(name:"Joye") { name age friends { name age } }}',
    new Root(),
    {year: 2017} // This could also be an authentication token
).then((result) => console.log(JSON.stringify(result, null, 2)))
