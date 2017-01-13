/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    export interface Query<Ctx> {
        stringField?: GraphqlField<{}, string | undefined, Ctx>
        booleanField?: GraphqlField<{}, boolean | undefined, Ctx>
        intField?: GraphqlField<{}, number | undefined, Ctx>
        floatField?: GraphqlField<{}, number | undefined, Ctx>
        idField?: GraphqlField<{}, string | undefined, Ctx>
    }

    export const defaultResolvers = {

    }
}
