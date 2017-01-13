/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    export interface Query<Ctx> {
        /**
         * A field description
         */
        field1?: GraphqlField<{}, TypeA<Ctx> | undefined, Ctx>
        /**
         * Another field description
         */
        field2?: GraphqlField<{}, TypeB<Ctx> | undefined, Ctx>
    }

    /**
     * A simple type
     * Multiline description
     */
    export interface TypeA<Ctx> {
        name?: GraphqlField<{}, string | undefined, Ctx>
        size?: GraphqlField<{}, number | undefined, Ctx>
    }

    /**
     * Another more complex type
     */
    export interface TypeB<Ctx> {
        nested?: GraphqlField<{}, (TypeA<Ctx> | undefined)[] | undefined, Ctx>
    }

    export const defaultResolvers = {

    }
}
