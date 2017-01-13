import {Root, TypeDef, Field, Argument, EnumValue, InputField} from './model'
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
        '__Schema', '__Type', '__TypeKind', '__Field', '__InputValue', '__EnumValue',
        '__Directive', '__DirectiveLocation'
    ])

    constructor(options: Options) {
        this.options = options
    }

    /**
     * Render the whole schema as interface
     * @param root
     * @returns {string}
     */
    render(root: Root): string {
        const namespace = source`
export namespace schema {
    export type GraphqlField<Args, Result, Ctx> = Result | Promise<Result> |
        ((args: Args, context: Ctx) => Result | Promise<Result>)

    ${this.renderEnums(root.data.__schema.types)}
    ${this.renderUnions(root.data.__schema.types)}
    ${this.renderInterfaces(root.data.__schema.types)}
    ${this.renderInputObjects(root.data.__schema.types)}
    ${this.renderTypes(root.data.__schema.types)}
    ${this.renderDefaultResolvers(root.data.__schema.types)}
}`
        return `/* tslint:disable */

${namespace.replace(/^\s+$/mg, '')}`
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
            .map((type) => this.renderTypeDef(type, types))
            .join('\n\n')
    }

    /**
     * Render a Type (i.e. an interface)
     * @param type
     * @returns
     */
    renderTypeDef(type: TypeDef, all: TypeDef[]): string {
        return source`
${this.renderComment(type.description)}
export interface ${type.name}<Ctx> ${this.renderExtends(type)}{
    ${this.renderTypename(type.name, all)}${OMIT_NEXT_NEWLINE}
${type.fields.map((field) => this.renderMemberWithComment(field)).join('\n')}
}
`
    }

    /**
     * Renders a __typename constant if the type is used in a union or interface.
     * @param forType
     * @param all
     */
    renderTypename(forType: string, all: TypeDef[]): string {
        const usedBy = all
            .filter((type) => !this.introspectionTypes[type.name])
            .filter((type) => type.kind === 'UNION' || type.kind === 'INTERFACE')
            .filter((type) => type.possibleTypes.filter((cand) => cand.name === forType).length > 0)
        if (usedBy.length === 0) {
            return ''
        }
        return `__typename: '${forType}'\n`
    }

    /**
     * Renders the extends clause of an interface (e.g. 'extends A, B. C').
     * @param type
     * @returns
     */
    renderExtends(type: TypeDef): string {
        if (type.interfaces && type.interfaces.length > 0) {
            const interfaces = type.interfaces.map((it) => `${it.name}<Ctx>`).join(', ')
            return `extends ${interfaces} `
        } else {
            return ''
        }
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
        const optional = field.type.kind !== 'NON_NULL'
        const type = this.renderType(field.type, false)
        const resultType = optional ? `${type} | undefined` : type
        const argType = this.renderArgumentType(field.args || [])
        const name = optional ? field.name + '?' : field.name
        return `${name}: GraphqlField<${argType}, ${resultType}, Ctx>`
    }

    /**
     * Render a single return type (or field type)
     * This function creates the base type that is then used as generic to a promise
     */
    renderType(type, optional: boolean) {
        function maybeOptional(arg) {
            return optional ? `(${arg} | undefined)` : arg
        }
        function generic(arg) {
            return `${arg}<Ctx>`
        }

        switch (type.kind) {
            case 'SCALAR':
                return maybeOptional(scalars[type.name])
            case 'ENUM':
            case 'INPUT_OBJECT':
                return maybeOptional(type.name)
            case 'OBJECT':
            case 'UNION':
            case 'INTERFACE':
                return maybeOptional(generic(type.name))
            case 'LIST':
                return maybeOptional(`${this.renderType(type.ofType, true)}[]`)
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
        return `/**\n * ` + description.split('\n').join(`\n * `) + `\n */`
    }

    /**
     * Render the arguments of a function
     */
    renderArgumentType(args: Argument[]) {
        const base = args.map((arg) => {
            return `${arg.name}: ${this.renderType(arg.type, false)}`
        }).join(', ')
        return `{${base}}`
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
        // Scalars cannot be used in unions, so we're safe here
        const unionValues = type.possibleTypes.map(type => `${type.name}<Ctx>`).join(' | ')
        return source`
${this.renderComment(type.description)}
export type ${type.name}<Ctx> = ${unionValues}

`
    }

    /**
     * Render a list of interfaces.
     * @param types
     * @returns
     */
    renderInterfaces(types: TypeDef[]) {
        return types
            .filter((type) => !this.introspectionTypes[type.name])
            .filter((type) => type.kind === 'INTERFACE')
            .map((type) => this.renderInterface(type))
            .join('\n')
    }

    /**
     * Render an interface.
     * @param type
     * @returns
     */
    renderInterface(type: TypeDef): string {
        return source`
${this.renderComment(type.description)}
export interface ${type.name}<Ctx> {
    ${type.fields.map((field) => this.renderMemberWithComment(field)).join('\n')}
}
`
    }

    /**
     * Render a list of input object.
     * @param types
     * @returns
     */
    renderInputObjects(types: TypeDef[]) {
        return types
            .filter((type) => !this.introspectionTypes[type.name])
            .filter((type) => type.kind === 'INPUT_OBJECT')
            .map((type) => this.renderInputObject(type))
            .join('\n')
    }

    /**
     * Render an input object.
     * @param type
     * @returns
     */
    renderInputObject(type: TypeDef): string {
        return source`
${this.renderComment(type.description)}
export interface ${type.name} {
    ${type.inputFields.map((field) => this.renderInputMemberWithComment(field)).join('\n')}
}
`
    }

    /**
     * Render a input member (field or method) and its doc-comment
     * @param field
     * @returns
     */
    renderInputMemberWithComment(field: InputField): string {
        return source`
${this.renderComment(field.description)}
${this.renderInputMember(field)}
`
    }

    /**
     * Render a single input field or method without doc-comment
     * @param field
     * @returns {string}
     */
    renderInputMember(field: InputField) {
        const type = this.renderType(field.type, false)
        // Render property as field, with the option of being of a function-type () => ReturnValue
        const optional = field.type.kind !== 'NON_NULL'
        const name = optional ? field.name + '?' : field.name
        return `${name}: ${type}`
    }

    /**
     * Render a default resolver that implements resolveType for all unions and interfaces.
     * @param types
     * @return string
     */
    renderDefaultResolvers(types: TypeDef[]): string {
        const resolvers = types
            .filter((type) => !this.introspectionTypes[type.name])
            .filter((type) => type.kind === 'UNION' || type.kind === 'INTERFACE')
            .map((type) => this.renderResolver(type))
            .join(',\n')
        return source`\n
export const defaultResolvers = {
${resolvers}
}`
    }

    /**
     * Renders a single resolver.
     *
     * @param type
     * @return string
     */
    renderResolver(type: TypeDef): string {
        return source`
    ${type.name}: {
        __resolveType(obj) {
            return obj.__typename
        }
    }`
    }
}

const scalars = {
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
    return array.reduce(
        (set, current): {[key: string]: boolean} => {
            set[current] = true
            return set
        },
        {})
}
