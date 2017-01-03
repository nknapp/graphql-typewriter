export namespace schema {
    export interface Query {
        requiredStringField: string | Promise<string> | { (): string } | { (): Promise<string> }
        optionalStringField: string | Promise<string> | { (): string } | { (): Promise<string> }
        requiredIntField: number | Promise<number> | { (): number } | { (): Promise<number> }
        requiredObjectField: A | Promise<A> | { (): A } | { (): Promise<A> }
        requiredList: string[] | Promise<string[]> | { (): string[] } | { (): Promise<string[]> }
        requiredListOfRequired: string[] | Promise<string[]> | { (): string[] } | { (): Promise<string[]> }
    }

    export interface A {
        name: string | Promise<string> | { (): string } | { (): Promise<string> }
    }
}
