export interface CliArgs {
    /**
     * An array of exclude paths
     */
    exclude: string[];
    dontSaveSameFile: boolean;
    out: string;
}
export declare function runCli(cliArgs: CliArgs): Promise<any>;
