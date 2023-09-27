"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reloadPage = exports.navigateToPage = exports.getCurrentPageId = exports.currentPathMatchesPageId = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var navigateToPage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(page, pageId, _ref) {
    var pagesConfig, hostsConfig, _process$env$UI_AUTOM, hostName, hostPath, url, pagesConfigItem;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pagesConfig = _ref.pagesConfig, hostsConfig = _ref.hostsConfig;
            _process$env$UI_AUTOM = process.env.UI_AUTOMATION_HOST, hostName = _process$env$UI_AUTOM === void 0 ? 'localhost' : _process$env$UI_AUTOM;
            hostPath = hostsConfig["".concat(hostName)]; // console.log('hostPath ', hostPath);

            url = new URL(hostPath); // console.log('url ', url);

            pagesConfigItem = pagesConfig[pageId];
            url.pathname = pagesConfigItem.route; // console.log('url.pathname ', url.pathname);

            _context.next = 8;
            return page.goto(url.href);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function navigateToPage(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.navigateToPage = navigateToPage;

var pathMatchesPageId = function pathMatchesPageId(path, pageId, _ref3) {
  var pagesConfig = _ref3.pagesConfig;
  var pageRegexString = pagesConfig[pageId].regex;
  var pageRegex = new RegExp(pageRegexString);
  return pageRegex.test(path);
};

var currentPathMatchesPageId = function currentPathMatchesPageId(page, pageId, globalConfig) {
  var _URL = new URL(page.url()),
      currentPath = _URL.pathname; // console.log("currentPath ", currentPath);


  return pathMatchesPageId(currentPath, pageId, globalConfig);
};

exports.currentPathMatchesPageId = currentPathMatchesPageId;

var getCurrentPageId = function getCurrentPageId(page, globalConfig) {
  // returns all the page mappings
  var pagesConfig = globalConfig.pagesConfig; // console.log('pagesConfig ', pagesConfig);
  // object keys return array of the pages

  var pageConfigPageIds = Object.keys(pagesConfig); // console.log('pageConfigPageIds ', pageConfigPageIds);
  // retrieve the url from the browser

  var _URL2 = new URL(page.url()),
      currentPath = _URL2.pathname; // find a page using the .find where the url matches the regex


  var currentPageId = pageConfigPageIds.find(function (pageId) {
    return pathMatchesPageId(currentPath, pageId, globalConfig);
  }); // console.log('currentPageId ', currentPageId);
  // if false we return error, if you try to pass e.g. login; and it's not
  // in the pages.json

  if (!currentPageId) {
    throw Error("Failed to get page name from current route ".concat(currentPath, "              possible pages: ").concat(JSON.stringify(pagesConfig)));
  }

  return currentPageId;
};

exports.getCurrentPageId = getCurrentPageId;

var reloadPage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(page) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return page.reload();

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function reloadPage(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.reloadPage = reloadPage;