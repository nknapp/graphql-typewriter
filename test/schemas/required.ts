/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    export interface Query<Ctx> {
        requiredStringField: GraphqlField<{}, string, Ctx>
        optionalStringField?: GraphqlField<{}, string | undefined, Ctx>
        requiredIntField: GraphqlField<{}, number, Ctx>
        requiredObjectField: GraphqlField<{}, A<Ctx>, Ctx>
        requiredListOfOptionals: GraphqlField<{}, (string | undefined)[], Ctx>
        optionalListOfOptionals?: GraphqlField<{}, (string | undefined)[] | undefined, Ctx>
        requiredListOfRequired: GraphqlField<{}, string[], Ctx>
        optionalListOfRequired?: GraphqlField<{}, string[] | undefined, Ctx>
    }

    export interface A<Ctx> {
        name: GraphqlField<{}, string, Ctx>
    }

    export const defaultResolvers = {

    }
}
