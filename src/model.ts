export interface Root {
    data: {
        __schema: {
            types: TypeDef[]
        }
    }
}

/**
 * Model definition of the introspection result
 */

export interface TypeDef {
    name: string
    kind: "SCALAR" | "OBJECT" | "NON_NULL" | "LIST" | "ENUM"
    description: string
    fields?: Field[]
    enumValues?: EnumValue[]

    // Not yet considered
    inputFields: any
    interfaces: any[]
    possibleTypes: any
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
    kind: "SCALAR" | "OBJECT" | "NON_NULL" | "LIST" | "ENUM"
    name: string
    ofType: Type
}

export class EnumValue {
    name: string
    description: string
    deprecated: boolean
    deprecationReason?: string
}