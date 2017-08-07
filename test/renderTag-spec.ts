import { source, OMIT_NEXT_NEWLINE } from '../src/renderTag'
import { expect } from 'chai'

describe('The renderTag function', function () {
    it('should render simple template literals like the default template literal', function () {
        expect(source`ein ${'einfacher'} string ${2}`).to.equal('ein einfacher string 2')
    })

    it('should skip the first and the last newline of the result', function () {
        expect(source`\nein ${'einfacher'} string ${2}\n`).to.equal('ein einfacher string 2')
    })

    it('should skip no more than the first and the last newline of the result', function () {
        expect(source`\n\nein ${'einfacher'} string ${2}\n\n`).to.equal('\nein einfacher string 2\n')
    })

    it('should indent multiline replacements with the indent of the substitution', function () {
        expect(source`abc\n   ${'multiline\nsubstitution'}`).to.equal('abc\n   multiline\n   substitution')
    })

    it('should omit whitespace and the next newline after a OMIT_NEXT_NEWLINE substitution', function () {
        expect(source`abc${OMIT_NEXT_NEWLINE}   \nabc`).to.equal('abcabc')
    })
})
