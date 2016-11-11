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
