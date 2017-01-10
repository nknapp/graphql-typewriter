/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result, Ctx> = Result | Promise<Result> | ((args: Args, context: Ctx) => Result | Promise<Result>)

    export interface Query<Ctx> {
        field1?: Resolver<{a: string, b: number}, string | undefined, Ctx>
    }
}
