/* tslint:disable */
export namespace schema {

    export type Single = A

    /**
     * A or B
     */
    export type AOrB = A | B

    export interface Query {
        single?: Single | Promise<Single | undefined> | { (): Single | undefined } | { (): Promise<Single | undefined> }
        aOrB?: AOrB | Promise<AOrB | undefined> | { (): AOrB | undefined } | { (): Promise<AOrB | undefined> }
    }

    export interface A {
        aName?: string | Promise<string | undefined> | { (): string | undefined } | { (): Promise<string | undefined> }
    }

    export interface B {
        bName?: string | Promise<string | undefined> | { (): string | undefined } | { (): Promise<string | undefined> }
    }
}
