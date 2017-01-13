/* tslint:disable */

export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    export type STATE = 'OPEN' | 'CLOSED' | 'DELETED'
    export const STATE: {
        OPEN: 'OPEN',
        CLOSED: 'CLOSED',
        DELETED: 'DELETED',
    } = {
        OPEN: 'OPEN',
        CLOSED: 'CLOSED',
        /**
         * permanently deleted
         */
        DELETED: 'DELETED',
    }

    export interface Query<Ctx> {
        state: GraphqlField<{}, STATE, Ctx>
        optionalState?: GraphqlField<{}, STATE | undefined, Ctx>
    }

    export const defaultResolvers = {

    }
}
