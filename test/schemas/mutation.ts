/* tslint:disable */
export namespace schema {

    /**
     * Set a key to a value
     */
    export interface SetValueCommand {
        key: string
        value?: string
    }
    export interface Query {
        values?: (KeyValue | undefined)[] | Promise<(KeyValue | undefined)[] | undefined> | { (): (KeyValue | undefined)[] | undefined } | { (): Promise<(KeyValue | undefined)[] | undefined> }
    }

    export interface KeyValue {
        key: string | Promise<string> | { (): string } | { (): Promise<string> }
        value?: string | Promise<string | undefined> | { (): string | undefined } | { (): Promise<string | undefined> }
    }

    export interface Mutation {
        simpleMutation(args: {key: string, value: string}): (KeyValue | undefined)[] | Promise<(KeyValue | undefined)[]>
        commandMutation(args: {cmd: SetValueCommand}): (KeyValue | undefined)[] | Promise<(KeyValue | undefined)[]>
    }
}