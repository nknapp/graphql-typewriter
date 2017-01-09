/* tslint:disable */

export namespace schema {
    export type Resolver<Args, Result> =
        Result |
        Promise<Result> |
        ((root: any, args: Args, context: any) => Result | Promise<Result>)

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

    export interface Query {
        state: Resolver<{}, STATE>
        optionalState?: Resolver<{}, STATE | undefined>
    }
}
