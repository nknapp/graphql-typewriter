/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result> =
        Result |
        Promise<Result> |
        ((root: any, args: Args, context: any) => Result | Promise<Result>)

    export interface Query {
        requiredStringField: Resolver<{}, string>
        optionalStringField?: Resolver<{}, string | undefined>
        requiredIntField: Resolver<{}, number>
        requiredObjectField: Resolver<{}, A>
        requiredListOfOptionals: Resolver<{}, (string | undefined)[]>
        optionalListOfOptionals?: Resolver<{}, (string | undefined)[] | undefined>
        requiredListOfRequired: Resolver<{}, string[]>
        optionalListOfRequired?: Resolver<{}, string[] | undefined>
    }

    export interface A {
        name: Resolver<{}, string>
    }
}
