export interface Root {
    data: {
        __schema: {
            types: TypeDef[]
        }
    }
}

export type Kind = "SCALAR" | "OBJECT" | "NON_NULL" | "LIST" | "ENUM" | "UNION"

/**
 * Model definition of the introspection result
 */

export interface TypeDef {
    name: string
    kind: Kind
    description: string
    fields?: Field[]
    enumValues?: EnumValue[]
    possibleTypes?: Type[]

    // Not yet considered
    inputFields: any
    interfaces: any[]
}

export class Field {
    name: string
    description: string
    args: Argument[]
    type: Type
    isDeprecated: boolean
    deprecationReason: string
}

export class Argument {
    name: string
    description: string
    type: Type
    defaultValue: string
}

export class Type {
    kind: Kind
    name: string
    ofType: Type
}

export class EnumValue {
    name: string
    description: string
    deprecated: boolean
    deprecationReason?: string
}