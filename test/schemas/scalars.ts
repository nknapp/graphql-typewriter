/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result> =
        Result |
        Promise<Result> |
        ((root: any, args: Args, context: any) => Result | Promise<Result>)

    export interface Query {
        stringField?: Resolver<{}, string | undefined>
        booleanField?: Resolver<{}, boolean | undefined>
        intField?: Resolver<{}, number | undefined>
        floatField?: Resolver<{}, number | undefined>
        idField?: Resolver<{}, string | undefined>
    }
}
