export namespace schema {
    export interface Query {
        /**
         * A field description
         */
        field1?: TypeA | Promise<TypeA | undefined> | { (): TypeA | undefined } | { (): Promise<TypeA | undefined> }
        /**
         * Another field description
         */
        field2?: TypeB | Promise<TypeB | undefined> | { (): TypeB | undefined } | { (): Promise<TypeB | undefined> }
    }

    /**
     * A simple type
     * Multiline description
     */
    export interface TypeA {
        name?: string | Promise<string | undefined> | { (): string | undefined } | { (): Promise<string | undefined> }
        size?: number | Promise<number | undefined> | { (): number | undefined } | { (): Promise<number | undefined> }
    }

    /**
     * Another more complex type
     */
    export interface TypeB {
        nested?: (TypeA | undefined)[] | Promise<(TypeA | undefined)[] | undefined> | { (): (TypeA | undefined)[] | undefined } | { (): Promise<(TypeA | undefined)[] | undefined> }
    }
}
