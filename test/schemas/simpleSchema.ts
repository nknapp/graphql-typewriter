/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result> =
        Result |
        Promise<Result> |
        ((root: any, args: Args, context: any) => Result | Promise<Result>)

    export interface Query {
        /**
         * A field description
         */
        field1?: Resolver<{}, TypeA | undefined>
        /**
         * Another field description
         */
        field2?: Resolver<{}, TypeB | undefined>
    }

    /**
     * A simple type
     * Multiline description
     */
    export interface TypeA {
        name?: Resolver<{}, string | undefined>
        size?: Resolver<{}, number | undefined>
    }

    /**
     * Another more complex type
     */
    export interface TypeB {
        nested?: Resolver<{}, (TypeA | undefined)[] | undefined>
    }
}
