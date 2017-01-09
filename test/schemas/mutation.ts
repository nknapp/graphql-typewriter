/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result> =
        Result |
        Promise<Result> |
        ((root: any, args: Args, context: any) => Result | Promise<Result>)

    /**
     * Set a key to a value
     */
    export interface SetValueCommand {
        key: string
        value?: string
    }
    export interface Query {
        values?: Resolver<{}, (KeyValue | undefined)[] | undefined>
    }

    export interface KeyValue {
        key: Resolver<{}, string>
        value?: Resolver<{}, string | undefined>
    }

    export interface Mutation {
        simpleMutation?: Resolver<{key: string, value: string}, (KeyValue | undefined)[] | undefined>
        commandMutation?: Resolver<{cmd: SetValueCommand}, (KeyValue | undefined)[] | undefined>
    }
}
