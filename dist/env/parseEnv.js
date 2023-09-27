"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJsonFromFile = exports.envNumber = exports.env = void 0;

/*
* If parses env then we are expecting an environment variable to be set
* otherwise stop the test.
* If not browser is defined we can't run the test.
* */
var env = function env(key) {
  var value = process.env[key];

  if (!value) {
    throw Error("No environment variable found for ".concat(key));
  }

  return value;
};
/*
* getJasonFromFile and return it in this structure Record<string, string>
  If then we cross back into our global.ts; it's very simple, and it's matching
  to actual types, mapping our types declaration global.ts, and it needs to be
  because the global object that comes back from that in order to use it, we are
  required to match the mappings.
* */


exports.env = env;

var getJsonFromFile = function getJsonFromFile(path) {
  return require("".concat(process.cwd()).concat(path));
};

exports.getJsonFromFile = getJsonFromFile;

var envNumber = function envNumber(key) {
  return Number(env[key]);
};

exports.envNumber = envNumber;