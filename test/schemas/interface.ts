/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result, Ctx> = Result | Promise<Result> | ((args: Args, context: Ctx) => Result | Promise<Result>)

    /**
     * A character
     */
    export interface Character<Ctx> {
        id: Resolver<{}, string, Ctx>
        name: Resolver<{}, string, Ctx>
    }
    export interface Functional<Ctx> {
        primaryFunction?: Resolver<{}, string | undefined, Ctx>
    }

    export interface Query<Ctx> {
        characters?: Resolver<{}, (Character<Ctx> | undefined)[] | undefined, Ctx>
    }

    export interface Human<Ctx> extends Character<Ctx> {
        id: Resolver<{}, string, Ctx>
        name: Resolver<{}, string, Ctx>
        friends?: Resolver<{}, (Character<Ctx> | undefined)[] | undefined, Ctx>
    }

    export interface Droid<Ctx> extends Character<Ctx>, Functional<Ctx> {
        id: Resolver<{}, string, Ctx>
        name: Resolver<{}, string, Ctx>
        primaryFunction?: Resolver<{}, string | undefined, Ctx>
    }
}
