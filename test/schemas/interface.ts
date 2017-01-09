/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result> =
        Result |
        Promise<Result> |
        ((root: any, args: Args, context: any) => Result | Promise<Result>)

    /**
     * A character
     */
    export interface Character {
        id: Resolver<{}, string>
        name: Resolver<{}, string>
    }
    export interface Functional {
        primaryFunction?: Resolver<{}, string | undefined>
    }

    export interface Query {
        characters?: Resolver<{}, (Character | undefined)[] | undefined>
    }

    export interface Human extends Character {
        id: Resolver<{}, string>
        name: Resolver<{}, string>
        friends?: Resolver<{}, (Character | undefined)[] | undefined>
    }

    export interface Droid extends Character, Functional {
        id: Resolver<{}, string>
        name: Resolver<{}, string>
        primaryFunction?: Resolver<{}, string | undefined>
    }
}
