"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementLocator = void 0;

var _navigationBehavior = require("./navigation-behavior");

/*
* Will determine our element identifier based on our current page and the element key
* or parameter passed by cucumber.
* */
var getElementLocator = function getElementLocator(page, elementKey, globalConfig) {
  var _pageElementMappings$, _pageElementMappings$2;

  var currentPage = (0, _navigationBehavior.getCurrentPageId)(page, globalConfig); // Get Page elements mapping from global config

  var pageElementMappings = globalConfig.pageElementMappings; // // retrieve our currently set of global variables for current screen
  // const currentPage = globalVariables.currentScreen;
  // We're returning our page element mappings based on our current page, e.g. Home
  // However, if this element, key or keys don't exist, basically try and then retrieve from common.json

  return ((_pageElementMappings$ = pageElementMappings[currentPage]) === null || _pageElementMappings$ === void 0 ? void 0 : _pageElementMappings$[elementKey]) || ((_pageElementMappings$2 = pageElementMappings.common) === null || _pageElementMappings$2 === void 0 ? void 0 : _pageElementMappings$2[elementKey]);
};

exports.getElementLocator = getElementLocator;