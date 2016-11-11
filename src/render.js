"use strict";
function renderSchema(root) {
    return `export namespace schema {\n`
        + indentBy(4, root.data.__schema.types
            .filter((type) => !introspectionTypes[type.name])
            .filter((type) => type.kind === 'OBJECT')
            .map(renderTypeDef).join('\n\n'))
        + '\n}\n';
}
exports.renderSchema = renderSchema;
var introspectionTypes = {
    __Schema: true,
    __Type: true,
    __TypeKind: true,
    __Field: true,
    __InputValue: true,
    __EnumValue: true,
    __Directive: true,
    __DirectiveLocation: true
};
function renderTypeDef(type) {
    return renderComment(type.description)
        + `export interface ${type.name} {\n`
        + indentBy(4, type.fields.map(renderField).join('\n'))
        + '\n}';
}
function renderField(field) {
    var result = renderComment(field.description);
    var typeStr = renderType(field.type);
    if (field.args && field.args.length > 0) {
        // Render property with arguments as functions
        result += `${field.name}(${renderArguments(field.args)}): ${renderDirectTypes(typeStr)}`;
    }
    else {
        // Render property as field, with the option of being of a function-type () => ReturnValue
        result += `${field.name}: ${renderDirectTypes(typeStr)} | ${renderFunctionTypes(typeStr)}`;
    }
    return result;
}
/**
 * Render the type on all variants (promises etc)
 * @param type
 */
function renderDirectTypes(typeStr) {
    return `${typeStr} | Promise<${typeStr}>`;
}
function renderFunctionTypes(typeStr) {
    return `{ (): ${typeStr} } | { (): Promise<${typeStr}> }`;
}
var scalars = {
    'String': 'string',
    'Int': 'number'
};
function renderType(type) {
    switch (type.kind) {
        case 'SCALAR':
            return scalars[type.name];
        case 'OBJECT':
            return type.name;
        case 'LIST':
            return `${renderType(type.ofType)}[]`;
    }
}
/**
 * Render a comment at a given indentation
 */
function renderComment(description) {
    if (!description) {
        return "";
    }
    return `/**\n * ` + description.split('\n').join(`\n * `) + `\n */\n`;
}
function renderArguments(args) {
    return "args: {"
        + args.map((arg) => {
            return `${arg.name}: ${renderType(arg.type)}`;
        }).join(', ')
        + "}";
}
const LONG_STRING_FOR_INDENT = '                                                             ';
/**
 * Indents the given block by a specific amount
 * @param indent
 * @param string
 */
function indentBy(indent, string) {
    var indentStr = LONG_STRING_FOR_INDENT.substr(0, indent);
    return indentStr + string.split('\n').join(`\n${indentStr}`).replace(/^\s+$/mg, "");
}
//# sourceMappingURL=render.js.map