/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result, Ctx> = Result | Promise<Result> | ((args: Args, context: Ctx) => Result | Promise<Result>)

    /**
     * Set a key to a value
     */
    export interface SetValueCommand {
        key: string
        value?: string
    }
    export interface Query<Ctx> {
        values?: Resolver<{}, (KeyValue<Ctx> | undefined)[] | undefined, Ctx>
    }

    export interface KeyValue<Ctx> {
        key: Resolver<{}, string, Ctx>
        value?: Resolver<{}, string | undefined, Ctx>
    }

    export interface Mutation<Ctx> {
        simpleMutation?: Resolver<{key: string, value: string}, (KeyValue<Ctx> | undefined)[] | undefined, Ctx>
        commandMutation?: Resolver<{cmd: SetValueCommand}, (KeyValue<Ctx> | undefined)[] | undefined, Ctx>
    }
}
