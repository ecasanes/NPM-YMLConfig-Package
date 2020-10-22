export default class Config {
    fileExtension: string;
    configFilename: string;
    constructor(fileExtension?: string, configFilename?: string);
    initConfig(): void;
    getFiles(): {
        configYamlSample: string;
        configYaml: string;
    };
    getConfig(): any;
    getCurrentEnv(defaultEnv?: string): string;
}
//# sourceMappingURL=index.d.ts.map