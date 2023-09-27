"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smoke = exports.regression = exports.dev = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var fs = _interopRequireWildcard(require("fs"));

var _parseEnv = require("./env/parseEnv");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var environment = (0, _parseEnv.env)('NODE_ENV');

_dotenv.default.config({
  path: (0, _parseEnv.env)('COMMON_CONFIG_FILE')
}); // retrieve all env variables from file,
// populates these vars
// console.log(`${env('ENV_PATH')}${environment}`);


_dotenv.default.config({
  path: "".concat((0, _parseEnv.env)('ENV_PATH')).concat(environment, ".env")
}); // retrieve json and store them


var hostsConfig = (0, _parseEnv.getJsonFromFile)((0, _parseEnv.env)('HOSTS_URLS_PATH')); // console.log("hostsConfig ", hostsConfig);

var pagesConfig = (0, _parseEnv.getJsonFromFile)((0, _parseEnv.env)('PAGE_URLS_PATH')); // console.log("pagesConfig ", pagesConfig);

/*
*
* readdirSync, basically it's a method used to synchronously read the contents of a given directory.
* The method returns an array with all the file names or objects in the directory.
* The options argument can be used to change the format in which the files are returned from the method.
* Expects a direct path
*  */

var mappingFiles = fs.readdirSync("".concat(process.cwd()).concat((0, _parseEnv.env)('PAGE_ELEMENTS_PATH')));
/*
* So the final result of running the reducer across all elements of the array is a single value.
* const key = file.replace('.json', '');
* what's going to happen is it's basically going to return all our mappings pages.
* We might have a home.json, you might have a login.json.
* Is going to basically take our file name and replace '.json' with nothing ''.
* Meaning that in our mapping also it'll show `home` and then the relevant mappings,
* `log` in and the relevant mappings.
* const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`);
* We retrieve our mappings from each of our mappings .json
* And finally
* return {...pageElementConfigAcc, [key]: elementMappings};
* It's returning our object containing each page and its associated mappings.
*  */

var pageElementMappings = mappingFiles.reduce(function (pageElementConfigAcc, file) {
  var key = file.replace('.json', '');
  var elementMappings = (0, _parseEnv.getJsonFromFile)("".concat((0, _parseEnv.env)('PAGE_ELEMENTS_PATH')).concat(file));
  return _objectSpread(_objectSpread({}, pageElementConfigAcc), {}, _defineProperty({}, key, elementMappings));
}, {});
var worldParameters = {
  hostsConfig: hostsConfig,
  pagesConfig: pagesConfig,
  pageElementMappings: pageElementMappings
};
var common = "./src/features/**/*.feature  \n                --require-module ts-node/register                 --require ./src/step-definitions/**/**/*.ts                 --world-parameters ".concat(JSON.stringify(worldParameters), "                 -f json:./reports/report.json                 --format progress-bar                 --parallel ").concat((0, _parseEnv.env)('PARALLEL'), "                 --retry ").concat((0, _parseEnv.env)('RETRY')); // Profiles for running: cucumber-js --profile <option>

var dev = "".concat(common, " --tags '@dev'");
exports.dev = dev;
var smoke = "".concat(common, " --tags '@smoke'");
exports.smoke = smoke;
var regression = "".concat(common, " --tags '@regression'");
exports.regression = regression;