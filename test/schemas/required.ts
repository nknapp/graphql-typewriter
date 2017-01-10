/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result, Ctx> = Result | Promise<Result> | ((args: Args, context: Ctx) => Result | Promise<Result>)

    export interface Query<Ctx> {
        requiredStringField: Resolver<{}, string, Ctx>
        optionalStringField?: Resolver<{}, string | undefined, Ctx>
        requiredIntField: Resolver<{}, number, Ctx>
        requiredObjectField: Resolver<{}, A<Ctx>, Ctx>
        requiredListOfOptionals: Resolver<{}, (string | undefined)[], Ctx>
        optionalListOfOptionals?: Resolver<{}, (string | undefined)[] | undefined, Ctx>
        requiredListOfRequired: Resolver<{}, string[], Ctx>
        optionalListOfRequired?: Resolver<{}, string[] | undefined, Ctx>
    }

    export interface A<Ctx> {
        name: Resolver<{}, string, Ctx>
    }
}
