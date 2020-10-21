const config = require('./config');
const path = require('path');
const fs = require('fs');

console.log('YMLCONFIGR - tests starting...');

if (!config.getFiles) {
    throw new Error("getFiles function must be implemented");
}

if (!config.initConfig) {
    throw new Error("initConfig function must be implemented");
}

if (!config.getConfig) {
    throw new Error("getConfig function must be implemented");
}

if (!config.getCurrentEnv) {
    throw new Error("getCurrentEnv function must be implemented");
}

const fileName = 'config.yml.sample';
const ABS_PATH = path.resolve('');
const sampleFile = path.join(ABS_PATH, `/${fileName}`);

try {
    fs.readFileSync(sampleFile);
} catch (error) {
    throw new Error(`${fileName} file must be present`)
}




console.log('YMLCONFIGR - tests completed');