/* tslint:disable */
export namespace schema {
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
        state: STATE | Promise<STATE> | { (): STATE } | { (): Promise<STATE> }
        optionalState?: STATE | Promise<STATE | undefined> | { (): STATE | undefined } | { (): Promise<STATE | undefined> }
    }
}
