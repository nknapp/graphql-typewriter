export namespace schema {
    export interface Query {
        /**
         * A field description
         */
        field1: TypeA | Promise<TypeA> | { (): TypeA } | { (): Promise<TypeA> };
        /**
         * Another field description
         */
        field2: TypeB | Promise<TypeB> | { (): TypeB } | { (): Promise<TypeB> };
    }

    /**
     * A simple type
     * Multiline description
     */
    export interface TypeA {
        name: string | Promise<string> | { (): string } | { (): Promise<string> };
        size: number | Promise<number> | { (): number } | { (): Promise<number> };
    }

    /**
     * Another more complex type
     */
    export interface TypeB {
        nested: TypeA[] | Promise<TypeA[]> | { (): TypeA[] } | { (): Promise<TypeA[]> };
    }
}
