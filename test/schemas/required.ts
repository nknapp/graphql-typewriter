export namespace schema {
    export interface Query {
        requiredStringField: string | Promise<string> | { (): string } | { (): Promise<string> }
        optionalStringField?: string | Promise<string | undefined> | { (): string | undefined } | { (): Promise<string | undefined> }
        requiredIntField: number | Promise<number> | { (): number } | { (): Promise<number> }
        requiredObjectField: A | Promise<A> | { (): A } | { (): Promise<A> }
        requiredListOfOptionals: (string | undefined)[] | Promise<(string | undefined)[]> | { (): (string | undefined)[] } | { (): Promise<(string | undefined)[]> }
        optionalListOfOptionals?: (string | undefined)[] | Promise<(string | undefined)[] | undefined> | { (): (string | undefined)[] | undefined } | { (): Promise<(string | undefined)[] | undefined> }
        requiredListOfRequired: string[] | Promise<string[]> | { (): string[] } | { (): Promise<string[]> }
        optionalListOfRequired?: string[] | Promise<string[] | undefined> | { (): string[] | undefined } | { (): Promise<string[] | undefined> }
    }

    export interface A {
        name: string | Promise<string> | { (): string } | { (): Promise<string> }
    }
}
