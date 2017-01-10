/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result, Ctx> = Result | Promise<Result> | ((args: Args, context: Ctx) => Result | Promise<Result>)

    export type Single<Ctx> = A<Ctx>

    /**
     * A or B
     */
    export type AOrB<Ctx> = A<Ctx> | B<Ctx>

    export interface Query<Ctx> {
        single?: Resolver<{}, Single<Ctx> | undefined, Ctx>
        aOrB?: Resolver<{}, AOrB<Ctx> | undefined, Ctx>
    }

    export interface A<Ctx> {
        aName?: Resolver<{}, string | undefined, Ctx>
    }

    export interface B<Ctx> {
        bName?: Resolver<{}, string | undefined, Ctx>
    }
}
