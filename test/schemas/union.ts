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
        aOrB?: GraphqlField<{a: number}, AOrB<Ctx> | undefined, Ctx>
    }

    export interface A<Ctx> {
        __typename: 'A'
        aName?: GraphqlField<{}, string | undefined, Ctx>
    }

    export interface B<Ctx> {
        __typename: 'B'
        bName?: GraphqlField<{}, string | undefined, Ctx>
    }

    export const defaultResolvers = {
        Single: {
            __resolveType(obj) {
                return obj.__typename
            }
        },
        AOrB: {
            __resolveType(obj) {
                return obj.__typename
            }
        }
    }
}
