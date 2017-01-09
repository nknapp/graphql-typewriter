/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result> =
        Result |
        Promise<Result> |
        ((root: any, args: Args, context: any) => Result | Promise<Result>)

    export type Single = A

    /**
     * A or B
     */
    export type AOrB = A | B

    export interface Query {
        single?: Resolver<{}, Single | undefined>
        aOrB?: Resolver<{}, AOrB | undefined>
    }

    export interface A {
        aName?: Resolver<{}, string | undefined>
    }

    export interface B {
        bName?: Resolver<{}, string | undefined>
    }
}
