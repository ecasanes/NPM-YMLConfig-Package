const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const moduleName = 'ymlconfigr'
const ABS_PATH = path.join(path.resolve(''));
const MODULE_PATH = path.join(ABS_PATH, `/node_modules/${moduleName}`);
const config = {};

config.getFiles = (fileExtension = 'yml', configFilename = 'config') => {

    const configYamlSample = path.join(MODULE_PATH, `/${configFilename}.${fileExtension}.sample`);
    const configYaml = path.join(ABS_PATH, `/${configFilename}.${fileExtension}`);

    return {configYamlSample, configYaml};

}

config.initConfig = (fileExtension = 'yml', configFilename = 'config') => {

    const {configYamlSample, configYaml} = config.getFiles(fileExtension, configFilename);
    
    try{
        fs.readFileSync(configYaml, 'utf8');
    }catch(error){
        console.error(`[${moduleName}]: File not found - generating ${configFilename}.${fileExtension} file`);
        fs.copyFileSync(configYamlSample, configYaml);
    }

}

config.getConfig = (fileExtension = 'yml', configFilename = 'config') => {

    config.initConfig(fileExtension, configFilename);
    const {configYaml} = config.getFiles(fileExtension, configFilename);

    const contents = fs.readFileSync(configYaml, 'utf8');
    const data = yaml.safeLoad(contents);

    let currentEnv = config.getCurrentEnv();
    const configVariables = data[currentEnv];

    return configVariables;
    
}

config.getCurrentEnv = (defaultEnv = 'defaults') => {
    
    let currentEnv = process.env.NODE_ENV;

    if(typeof currentEnv !== 'string'){
        currentEnv = defaultEnv;
        return currentEnv;
    }

    currentEnv = currentEnv.toLowerCase();

    if(currentEnv.trim().length <= 0){
        currentEnv = defaultEnv;
        return currentEnv;
    }

    return currentEnv;
}

module.exports = config;