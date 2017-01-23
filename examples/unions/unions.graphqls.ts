/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    /**
     * An item of the search result (may be Person or Organization)
     */
    export type ResultItem<Ctx> = Person<Ctx> | Organization<Ctx>

    export interface Query<Ctx> {
        search: GraphqlField<{q: string}, (ResultItem<Ctx> | undefined)[], Ctx>
    }

    /**
     * A living person
     */
    export interface Person<Ctx> {
        __typename: 'Person'
        firstname: GraphqlField<{}, string, Ctx>
        lastname: GraphqlField<{}, string, Ctx>
    }

    /**
     * A company, NGO or something similar
     */
    export interface Organization<Ctx> {
        __typename: 'Organization'
        name: GraphqlField<{}, string, Ctx>
    }

    export const defaultResolvers = {
        ResultItem: {
            __resolveType(obj) {
                return obj.__typename
            }
        }
    }
}