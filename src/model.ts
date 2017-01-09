export interface Root {
    data: {
        __schema: {
            types: TypeDef[]
        }
    }
}

export type Kind = 'SCALAR' | 'OBJECT' | 'NON_NULL' | 'LIST' | 'ENUM' | 'UNION' | 'INTERFACE' | 'INPUT_OBJECT'

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
    interfaces?: Type[]
    inputFields: InputField[]
}

export class Field {
    name: string
    description: string
    args: Argument[]
    type: Type
    isDeprecated: boolean
    deprecationReason: string
}

export class InputField {
    name: string
    description: string
    type: Type
    defaultValue: any
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
