/* tslint:disable */
export namespace schema {
    export interface Query {
        stringField?: string | Promise<string | undefined> | { (): string | undefined } | { (): Promise<string | undefined> }
        booleanField?: boolean | Promise<boolean | undefined> | { (): boolean | undefined } | { (): Promise<boolean | undefined> }
        intField?: number | Promise<number | undefined> | { (): number | undefined } | { (): Promise<number | undefined> }
        floatField?: number | Promise<number | undefined> | { (): number | undefined } | { (): Promise<number | undefined> }
        idField?: string | Promise<string | undefined> | { (): string | undefined } | { (): Promise<string | undefined> }
    }
}
