"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_yaml_1 = __importDefault(require("js-yaml"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var moduleName = 'ymlconfigr';
var ABS_PATH = path_1.default.join(path_1.default.resolve(''));
var MODULE_PATH = path_1.default.join(ABS_PATH, "/node_modules/" + moduleName);
var Config = /** @class */ (function () {
    function Config(fileExtension, configFilename) {
        if (fileExtension === void 0) { fileExtension = 'yml'; }
        if (configFilename === void 0) { configFilename = 'config'; }
        this.fileExtension = fileExtension;
        this.configFilename = configFilename;
        this.initConfig();
    }
    Config.prototype.initConfig = function () {
        var fileExtension = this.fileExtension;
        var configFilename = this.configFilename;
        var _a = this.getFiles(), configYamlSample = _a.configYamlSample, configYaml = _a.configYaml;
        try {
            fs_1.default.readFileSync(configYaml, 'utf8');
        }
        catch (error) {
            console.error("[" + moduleName + "]: File not found - generating " + configFilename + "." + fileExtension + " file");
            fs_1.default.copyFileSync(configYamlSample, configYaml);
        }
    };
    Config.prototype.getFiles = function () {
        var configFilename = this.configFilename;
        var fileExtension = this.fileExtension;
        var configYamlSample = path_1.default.join(MODULE_PATH, "/" + configFilename + "." + fileExtension + ".sample");
        var configYaml = path_1.default.join(ABS_PATH, "/" + configFilename + "." + fileExtension);
        return { configYamlSample: configYamlSample, configYaml: configYaml };
    };
    Config.prototype.getConfig = function () {
        var configYaml = this.getFiles().configYaml;
        var contents = fs_1.default.readFileSync(configYaml, 'utf8');
        var data = js_yaml_1.default.safeLoad(contents);
        var currentEnv = this.getCurrentEnv();
        var configVariables = data[currentEnv];
        return configVariables;
    };
    Config.prototype.getCurrentEnv = function (defaultEnv) {
        if (defaultEnv === void 0) { defaultEnv = 'defaults'; }
        var currentEnv = process.env.NODE_ENV;
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
    };
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=index.js.map