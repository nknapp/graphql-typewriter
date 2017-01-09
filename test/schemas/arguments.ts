/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result> =
        Result |
        Promise<Result> |
        ((root: any, args: Args, context: any) => Result | Promise<Result>)

    export interface Query {
        field1?: Resolver<{a: string, b: number}, string | undefined>
    }
}
