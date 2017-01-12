/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    export type Single<Ctx> = A<Ctx>

    /**
     * A or B
     */
    export type AOrB<Ctx> = A<Ctx> | B<Ctx>

    export interface Query<Ctx> {
        single?: GraphqlField<{}, Single<Ctx> | undefined, Ctx>
        aOrB?: GraphqlField<{}, AOrB<Ctx> | undefined, Ctx>
    }

    export interface A<Ctx> {
        aName?: GraphqlField<{}, string | undefined, Ctx>
    }

    export interface B<Ctx> {
        bName?: GraphqlField<{}, string | undefined, Ctx>
    }
}