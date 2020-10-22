import Config from './index';
import path from 'path';
import fs from 'fs';

console.log('YMLCONFIGR - tests starting...');

// const config = new Config();

// console.log({ config });

// if (!config.getFiles) {
//     throw new Error("getFiles function must be implemented");
// }

// if (!config.getConfig) {
//     throw new Error("getConfig function must be implemented");
// }

// if (!config.getCurrentEnv) {
//     throw new Error("getCurrentEnv function must be implemented");
// }

const fileName = 'config.yml.sample';
const ABS_PATH = path.resolve('');
const sampleFile = path.join(ABS_PATH, `/${fileName}`);

// try {
//     fs.readFileSync(sampleFile);
// } catch (error) {
//     throw new Error(`${fileName} file must be present`)
// }


console.log('YMLCONFIGR - tests completed');