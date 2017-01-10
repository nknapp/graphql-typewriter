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