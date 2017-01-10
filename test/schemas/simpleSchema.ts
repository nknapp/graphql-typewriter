/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result, Ctx> = Result | Promise<Result> | ((args: Args, context: Ctx) => Result | Promise<Result>)

    export interface Query<Ctx> {
        /**
         * A field description
         */
        field1?: Resolver<{}, TypeA<Ctx> | undefined, Ctx>
        /**
         * Another field description
         */
        field2?: Resolver<{}, TypeB<Ctx> | undefined, Ctx>
    }

    /**
     * A simple type
     * Multiline description
     */
    export interface TypeA<Ctx> {
        name?: Resolver<{}, string | undefined, Ctx>
        size?: Resolver<{}, number | undefined, Ctx>
    }

    /**
     * Another more complex type
     */
    export interface TypeB<Ctx> {
        nested?: Resolver<{}, (TypeA<Ctx> | undefined)[] | undefined, Ctx>
    }
}
