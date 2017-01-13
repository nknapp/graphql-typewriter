/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    /**
     * A character
     */
    export interface Character<Ctx> {
        id: GraphqlField<{}, string, Ctx>
        name: GraphqlField<{}, string, Ctx>
    }
    export interface Functional<Ctx> {
        primaryFunction?: GraphqlField<{}, string | undefined, Ctx>
    }

    export interface Query<Ctx> {
        characters?: GraphqlField<{}, (Character<Ctx> | undefined)[] | undefined, Ctx>
    }

    export interface Human<Ctx> extends Character<Ctx> {
        __typename: 'Human'
        id: GraphqlField<{}, string, Ctx>
        name: GraphqlField<{}, string, Ctx>
        friends?: GraphqlField<{}, (Character<Ctx> | undefined)[] | undefined, Ctx>
    }

    export interface Droid<Ctx> extends Character<Ctx>, Functional<Ctx> {
        __typename: 'Droid'
        id: GraphqlField<{}, string, Ctx>
        name: GraphqlField<{}, string, Ctx>
        primaryFunction?: GraphqlField<{}, string | undefined, Ctx>
    }

    export const defaultResolvers = {
        Character: {
            __resolveType(obj) {
                return obj.__typename
            }
        },
        Functional: {
            __resolveType(obj) {
                return obj.__typename
            }
        }
    }
}
