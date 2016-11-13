import glob = require('glob')
import {Converter} from './index'
import fs = require('fs')
const mfs = require('m-io/fs');

export interface CliArgs {
    /**
     * An array of exclude paths
     */
    exclude: string[],
    dontSaveSameFile: boolean,
    out: string
}

async function readFile(sourceFile) {
    return mfs.read(sourceFile, {encoding: 'utf-8'});
}

const converter = new Converter();

async function convertSchema(source:string, sourceFile:string, targetFile:string, cliArgs:CliArgs) {
    try {

        const ts = await converter.convert(source);
        if (cliArgs.dontSaveSameFile) {
            const oldContents = await mfs.read(targetFile);
            if (oldContents === ts) {
                console.log(`${sourceFile} -> ${targetFile}`, 'success');
                return
            }
        }
        await mfs.write(targetFile, ts);
        console.log(`${sourceFile} -> ${targetFile}`, 'success');
    } catch (e) {
        console.log(`${sourceFile} -> ${targetFile}`, e);
    }
}

export async function runCli(cliArgs: CliArgs):Promise<any> {

    // Remove default value from 'exclude', if explicit values have been provided
    if (cliArgs.exclude.length > 1) {
        cliArgs.exclude.shift();
    }

    const files = glob.sync('**/*.graphqls', {
        ignore: cliArgs.exclude
    });

    if (!cliArgs.out) {
        await files.map(async (sourceFile) => {
            const source = await readFile(sourceFile);
            const targetFile = `${sourceFile}.ts`;
            convertSchema(source, sourceFile, targetFile, cliArgs)
        });
    }
    else {
        let fileContent = '';
        for (let file of files) {
            fileContent += await readFile(file);
        }
        await convertSchema(fileContent, files.join(','), `${cliArgs.out}.ts`, cliArgs);
    }

    console.log('Done');
}

export class Cli { 
    
    public static cli
}