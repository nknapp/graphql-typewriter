/* tslint:disable */
export namespace schema {

    /**
     * A character
     */
    export interface Character {
        id: string | Promise<string> | { (): string } | { (): Promise<string> }
        name: string | Promise<string> | { (): string } | { (): Promise<string> }
    }
    export interface Functional {
        primaryFunction?: string | Promise<string | undefined> | { (): string | undefined } | { (): Promise<string | undefined> }
    }

    export interface Query {
        characters?: (Character | undefined)[] | Promise<(Character | undefined)[] | undefined> | { (): (Character | undefined)[] | undefined } | { (): Promise<(Character | undefined)[] | undefined> }
    }

    export interface Human extends Character {
        id: string | Promise<string> | { (): string } | { (): Promise<string> }
        name: string | Promise<string> | { (): string } | { (): Promise<string> }
        friends?: (Character | undefined)[] | Promise<(Character | undefined)[] | undefined> | { (): (Character | undefined)[] | undefined } | { (): Promise<(Character | undefined)[] | undefined> }
    }

    export interface Droid extends Character, Functional {
        id: string | Promise<string> | { (): string } | { (): Promise<string> }
        name: string | Promise<string> | { (): string } | { (): Promise<string> }
        primaryFunction?: string | Promise<string | undefined> | { (): string | undefined } | { (): Promise<string | undefined> }
    }
}