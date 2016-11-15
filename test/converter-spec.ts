/*!
 * gql2ts-for-server <https://github.com/nknapp/gql2ts-for-server>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
// /* global it */
// /* global xdescribe */
// /* global xit */

import {Converter} from '../src/index'
import path = require('path')
import fs = require('fs')
import {expect} from 'chai'

var converter = new Converter()

function fixture(filename) {
    return path.join(__dirname, 'schemas', filename)
}
function store(file, code) {
    return fs.writeFileSync(file, code)
}

function read(file) {
    return fs.readFileSync(file, {encoding: 'utf-8'})
}



describe('gql2ts-for-server:', function () {
    // Automatic generation of tests from the testcases-directory
    fs.readdirSync(path.join(__dirname, 'schemas'))
        .filter((file) => file.match(/\.graphqls$/))
        .forEach((file) => {
            
            it(`should handle ${file} correctly`, async function () {
                var source = fixture(file)
                var target = source.replace(/\.graphqls$/,'.ts');

                var result = await converter.convert(read(source));
                // If the target file does not exist yet, we write it
                // with a short disclaimer, so that the test does not pass
                if (!fs.existsSync(target)) {
                    store(target, `// Please check this result\n${result}`)
                }
                expect(result).to.equal(read(target))
            })

        })
})
