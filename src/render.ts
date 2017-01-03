import {Root, TypeDef, Field, Type, Argument} from './model'
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
export namespace schema {
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
        var typeStr = this.renderType(field.type);
        if (field.args && field.args.length > 0) {
            // Render property with arguments as functions
            return `${field.name}(args: {${this.renderArgumentType(field.args)}}): ${this.renderDirectTypes(typeStr)}`
        } else {
            // Render property as field, with the option of being of a function-type () => ReturnValue
            return `${field.name}: ${this.renderDirectTypes(typeStr)} | ${this.renderFunctionTypes(typeStr)}`
        }
    }

    /**
     * Render the type of a field on all variants (promises, methods etc)
     * @param type
     */
    renderDirectTypes(typeStr: string) {
        return `${typeStr} | Promise<${typeStr}>`
    }

    /**
     * Render return type of a fuction the member as function
     * @param typeStr
     * @returns {string}
     */
    renderFunctionTypes(typeStr: string) {
        return `{ (): ${typeStr} } | { (): Promise<${typeStr}> }`
    }

    /**
     * Render a single return type (or field type)
     * This function creates the base type that is then used as generic to a promise
     */
    renderType(type) {
        switch (type.kind) {
            case 'SCALAR':
                return scalars[type.name]
            case 'OBJECT':
                return type.name
            case 'LIST':
                return `${this.renderType(type.ofType)}[]`
            case 'NON_NULL':
                return this.renderType(type.ofType)
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
            return `${arg.name}: ${this.renderType(arg.type)}`
        }).join(', ')
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
