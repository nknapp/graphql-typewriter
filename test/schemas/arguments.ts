/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    export interface Query<Ctx> {
        field1?: GraphqlField<{a: string, b: number}, string | undefined, Ctx>
    }

    export const defaultResolvers = {

    }
}
