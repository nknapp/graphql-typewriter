export interface CliArgs {
    /**
     * An array of exclude paths
     */
    exclude: string[];
    dontSaveSameFile: boolean;
}
export declare function runCli(cliArgs: CliArgs): Promise<any>;
