export namespace graphql {
    export interface Query {
        field1(args: {a: string, b: number}): string | Promise<string>
    }
}
