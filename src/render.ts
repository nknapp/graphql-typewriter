import {Root, TypeDef, Field, Type, Argument, EnumValue} from './model'
import {source, OMIT_NEXT_NEWLINE} from './renderTag'

export interface Options {
    tslint?: Object
}

export class Renderer {
    private options: Options

    /**
     * Types that are not created as interface, because they are part of the introspection
     */
    private introspectionTypes: {[key: string]: boolean} = setOf([
        "__Schema", "__Type", "__TypeKind", "__Field", "__InputValue", "__EnumValue",
        "__Directive", "__DirectiveLocation"
    ]);

    constructor(options: Options) {
        this.options = options
    }

    /**
     * Render the whole schema as interface
     * @param root
     * @returns {string}
     */
    render(root: Root): string {
        const result = source`
/* tslint:disable */
export namespace schema {
    ${this.renderEnums(root.data.__schema.types)}
    ${this.renderUnions(root.data.__schema.types)}
    ${this.renderTypes(root.data.__schema.types)}
}

`
        return result.replace(/^\s+$/mg, '')
    }

    /**
     * Render a list of type (i.e. interfaces)
     * @param types
     * @returns
     */
    renderTypes(types: TypeDef[]) {
        return types
            .filter((type) => !this.introspectionTypes[type.name])
            .filter((type) => type.kind === 'OBJECT')
            .map((type) => this.renderTypeDef(type))
            .join('\n\n')
    }

    /**
     * Render a Type (i.e. an interface)
     * @param type
     * @returns
     */
    renderTypeDef(type: TypeDef): string {
        return source`
${this.renderComment(type.description)}
export interface ${type.name} {
    ${type.fields.map((field) => this.renderMemberWithComment(field)).join('\n')}
}
`
    }

    /**
     * Render a member (field or method) and its doc-comment
     * @param field
     * @returns
     */
    renderMemberWithComment(field: Field): string {
        return source`
${this.renderComment(field.description)}
${this.renderMember(field)}
`
    }

    /**
     * Render a single field or method without doc-comment
     * @param field
     * @returns {string}
     */
    renderMember(field: Field) {
        var typeStr = this.renderType(field.type, false);
        if (field.args && field.args.length > 0) {
            // Render property with arguments as functions
            return `${field.name}(args: {${this.renderArgumentType(field.args)}}): ${this.renderDirectTypes(typeStr, false)}`
        } else {
            // Render property as field, with the option of being of a function-type () => ReturnValue
            const optional = field.type.kind !== 'NON_NULL'
            const name = optional ? field.name + '?' : field.name
            return `${name}: ${this.renderDirectTypes(typeStr, optional)} | ${this.renderFunctionTypes(typeStr, optional)}`
        }
    }

    /**
     * Render the type of a field on all variants (promises, methods etc)
     * @param type
     */
    renderDirectTypes(typeStr: string, optional: boolean) {
        if (optional) {
            return `${typeStr} | Promise<${typeStr} | undefined>`
        } else {
            return `${typeStr} | Promise<${typeStr}>`
        }
    }

    /**
     * Render return type of a fuction the member as function
     * @param typeStr
     * @returns {string}
     */
    renderFunctionTypes(typeStr: string, optional: boolean) {
        if (optional) {
            return `{ (): ${typeStr} | undefined } | { (): Promise<${typeStr} | undefined> }`
        } else {
            return `{ (): ${typeStr} } | { (): Promise<${typeStr}> }`
        }
    }

    /**
     * Render a single return type (or field type)
     * This function creates the base type that is then used as generic to a promise
     */
    renderType(type, optional: boolean) {
        function wrap(arg) {
            return optional ? `(${arg} | undefined)` : arg
        }
        switch (type.kind) {
            case 'SCALAR':
                return wrap(scalars[type.name])
            case 'OBJECT':
            case 'ENUM':
            case 'UNION':
                return wrap(type.name)
            case 'LIST':
                return wrap(`${this.renderType(type.ofType, true)}[]`)
            case 'NON_NULL':
                return this.renderType(type.ofType, false)
        }
    }

    /**
     * Render a description as doc-comment
     */
    renderComment(description: string): string | typeof OMIT_NEXT_NEWLINE {
        if (!description) {
            // Parsed by the `source` tag-function to remove the next newline
            return OMIT_NEXT_NEWLINE
        }
        return `/**\n * ` + description.split('\n').join(`\n * `) + `\n */`;
    }

    /**
     * Render the arguments of a function
     */
    renderArgumentType(args: Argument[]) {
        return args.map((arg) => {
            return `${arg.name}: ${this.renderType(arg.type, false)}`
        }).join(', ')
    }

    /**
     * Render a list of enums.
     * @param types
     * @returns
     */
    renderEnums(types: TypeDef[]) {
        return types
            .filter((type) => !this.introspectionTypes[type.name])
            .filter((type) => type.kind === 'ENUM')
            .map((type) => this.renderEnum(type))
            .join('\n')
    }

    /**
     * Render an Enum.
     * @param type
     * @returns
     */
    renderEnum(type: TypeDef): string {
        return source`
${this.renderComment(type.description)}
export type ${type.name} = ${type.enumValues.map((value) => `'${value.name}'`).join(' | ')}
export const ${type.name}: {
    ${type.enumValues.map((value) => this.renderEnumValueType(value)).join('\n')}
} = {
    ${type.enumValues.map((value) => this.renderEnumValue(value)).join('\n')}
}

`
    }

    /**
     * Renders a type definition for an enum value.
     */
    renderEnumValueType(value: EnumValue): string {
        return source`
${value.name}: '${value.name}',
`
    }

    /**
     * Renders a the definition of an enum value.
     */
    renderEnumValue(value: EnumValue): string {
        return source`
${this.renderComment(value.description)}
${value.name}: '${value.name}',
`
    }

    /**
     * Render a list of unions.
     * @param types
     * @returns
     */
    renderUnions(types: TypeDef[]) {
        return types
            .filter((type) => !this.introspectionTypes[type.name])
            .filter((type) => type.kind === 'UNION')
            .map((type) => this.renderUnion(type))
            .join('\n')
    }

    /**
     * Render a union.
     * @param type
     * @returns
     */
    renderUnion(type: TypeDef): string {
        const unionValues = type.possibleTypes.map(type => type.name).join(' | ')
        return source`
${this.renderComment(type.description)}
export type ${type.name} = ${unionValues}

`
    }
}

var scalars = {
    'String': 'string',
    'Int': 'number',
    'Float': 'number',
    'Boolean': 'boolean',
    'ID': 'string'
}

/**
 * Covert an array of strings into an object in which each string is a key with value 'true'
 * @param array
 * @returns {{}}
 */
function setOf(array: string[]): {[key: string]: boolean} {
    return array.reduce((set, current): {[key: string]: boolean} => {
        set[current] = true;
        return set;
    }, {})
}
