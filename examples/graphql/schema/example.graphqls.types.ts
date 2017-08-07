/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    /**
     * The base query
     */
    export interface Query<Ctx> {
        /**
         * Retrieve a person by name
         */
        person?: GraphqlField<{name: string}, Person<Ctx> | undefined, Ctx>
    }

    /**
     * A type describing a person
     */
    export interface Person<Ctx> {
        /**
         * The persons name
         */
        name: GraphqlField<{}, string, Ctx>
        /**
         * The persons age in years
         */
        age: GraphqlField<{}, number, Ctx>
        /**
         * Friendship relations to other persons
         */
        friends?: GraphqlField<{}, Person<Ctx>[] | undefined, Ctx>
    }

    export const defaultResolvers = {

    }
}