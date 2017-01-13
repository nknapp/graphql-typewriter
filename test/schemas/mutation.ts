/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    /**
     * Set a key to a value
     */
    export interface SetValueCommand {
        key: string
        value?: string
    }
    export interface Query<Ctx> {
        values?: GraphqlField<{}, (KeyValue<Ctx> | undefined)[] | undefined, Ctx>
    }

    export interface KeyValue<Ctx> {
        key: GraphqlField<{}, string, Ctx>
        value?: GraphqlField<{}, string | undefined, Ctx>
    }

    export interface Mutation<Ctx> {
        simpleMutation?: GraphqlField<{key: string, value: string}, (KeyValue<Ctx> | undefined)[] | undefined, Ctx>
        commandMutation?: GraphqlField<{cmd: SetValueCommand}, (KeyValue<Ctx> | undefined)[] | undefined, Ctx>
    }

    export const defaultResolvers = {

    }
}
