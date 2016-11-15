var spaces = '                                                                                       '

/**
 * Token that removes whitespace following the substition up to and including the next newline character
 * @type {{action: string}}
 */
export const OMIT_NEXT_NEWLINE = {
    action: 'omit next newline'
}

/**
 * Tag function for the template strings in this class.
 * Removes the first and last character, if it is a newline
 * and expands the current indent on multiline substitions
 * @see http://exploringjs.com/es6/ch_template-literals.html
 * @param array
 * @param args
 */
export function source(array, ...args) {
    var result = array[0]
    for (var i = 0; i < args.length; i++) {
        // Determine indent
        var indent = result.length - result.lastIndexOf('\n') - 1
        switch (args[i]) {
            case OMIT_NEXT_NEWLINE:
                result += array[i + 1].replace(/^ *\n/,'')
                break
            default:
                result += String(args[i]).replace(/\n/g, '\n' + spaces.slice(0, indent))
                result += array[i + 1]
        }
    }

    result = result.replace(/(^\n|\n$)/g, '')
    
    var templateTag = array[0].match(/\s*\n([ \t])*##+ TEMPLATE ##+\s*$/m);
    if (templateTag) {
        // Determine de-indent
        var deindent = templateTag[1].length - templateTag[1].lastIndexOf('\n') - 1
        return result
            .substr
            .split('\n')
            .map((line) => line.substr(deindent))
    }

    return result;
}
