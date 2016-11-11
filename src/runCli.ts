import glob = require('glob')
import {Converter}from './index'
import fs = require('fs')
var mfs = require('m-io/fs')

export interface CliArgs {
    /**
     * An array of exclude paths
     */
    exclude: string[],
    dontSaveSameFile: boolean
}

export async function runCli(cliArgs: CliArgs):Promise<any> {

    // Remove default value from 'exclude', if explicit values have been provided
    if (cliArgs.exclude.length > 1) {
        cliArgs.exclude.shift();
    }

    var files = glob.sync('**/*.graphqls', {
        ignore: cliArgs.exclude
    });

    var converter = new Converter()

    var promises = files.map(async (sourceFile) => {
        var targetFile = sourceFile + '.ts'
        try {
            var source = await mfs.read(sourceFile, {encoding: 'utf-8'})
            var ts = await converter.convert(source)
            if (cliArgs.dontSaveSameFile) {
                var oldContents = await mfs.read(targetFile)
                if (oldContents === ts) {
                    console.log(`${sourceFile} -> ${targetFile}`, 'success')
                    return 
                }
            }
            await mfs.write(targetFile, ts)
            console.log(`${sourceFile} -> ${targetFile}`, 'success')
        } catch (e) {
            console.log(`${sourceFile} -> ${targetFile}`, e)
        }
    })
    return Promise.all(promises)

}