import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const moduleName = 'ymlconfigr'
const ABS_PATH = path.join(path.resolve(''));
const MODULE_PATH = path.join(ABS_PATH, `/node_modules/${moduleName}`);

export default class Config {

    fileExtension: string;
    configFilename: string;

    constructor(fileExtension = 'yml', configFilename = 'config') {
        this.fileExtension = fileExtension;
        this.configFilename = configFilename;
        this.initConfig();
    }

    initConfig() {

        const fileExtension = this.fileExtension;
        const configFilename = this.configFilename;

        const { configYamlSample, configYaml } = this.getFiles();

        try {
            fs.readFileSync(configYaml, 'utf8');
        } catch (error) {
            console.error(`[${moduleName}]: File not found - generating ${configFilename}.${fileExtension} file`);
            fs.copyFileSync(configYamlSample, configYaml);
        }

    }

    getFiles() {

        const configFilename = this.configFilename;
        const fileExtension = this.fileExtension;

        const configYamlSample = path.join(MODULE_PATH, `/${configFilename}.${fileExtension}.sample`);
        const configYaml = path.join(ABS_PATH, `/${configFilename}.${fileExtension}`);

        return { configYamlSample, configYaml };

    }

    getConfig() {

        const { configYaml } = this.getFiles();

        const contents = fs.readFileSync(configYaml, 'utf8');
        const data: any = yaml.safeLoad(contents);

        let currentEnv = this.getCurrentEnv();
        const configVariables = data[currentEnv];

        return configVariables;

    }

    getCurrentEnv(defaultEnv = 'defaults'): string {

        let currentEnv = process.env.NODE_ENV;

        if (typeof currentEnv !== 'string') {
            currentEnv = defaultEnv;
            return currentEnv;
        }

        currentEnv = currentEnv.toLowerCase();

        if (currentEnv.trim().length <= 0) {
            currentEnv = defaultEnv;
            return currentEnv;
        }

        return currentEnv;

    }



}