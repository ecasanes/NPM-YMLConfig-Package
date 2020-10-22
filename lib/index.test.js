"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
console.log('YMLCONFIGR - tests starting...');
var config = new index_1.default();
console.log({ config: config });
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
var fileName = 'config.yml.sample';
var ABS_PATH = path_1.default.resolve('');
var sampleFile = path_1.default.join(ABS_PATH, "/" + fileName);
try {
    fs_1.default.readFileSync(sampleFile);
}
catch (error) {
    throw new Error(fileName + " file must be present");
}
console.log('YMLCONFIGR - tests completed');
//# sourceMappingURL=index.test.js.map