/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result, Ctx> = Result | Promise<Result> | ((args: Args, context: Ctx) => Result | Promise<Result>)

    export interface Query<Ctx> {
        stringField?: Resolver<{}, string | undefined, Ctx>
        booleanField?: Resolver<{}, boolean | undefined, Ctx>
        intField?: Resolver<{}, number | undefined, Ctx>
        floatField?: Resolver<{}, number | undefined, Ctx>
        idField?: Resolver<{}, string | undefined, Ctx>
    }
}
