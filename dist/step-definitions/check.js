"use strict";

var _cucumber = require("@cucumber/cucumber");

var _htmlBehaviour = require("../support/html-behaviour");

var _waitForBehaviour = require("../support/wait-for-behaviour");

var _webElementHelper = require("../support/web-element-helper");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _cucumber.Then)(/^I (check)?(uncheck)? the "([^"]*)" (?:check box|radio button|switch)$/, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(checked, unchecked, elementKey) {
    var page, globalConfig, elementIdentifier;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = this.screen.page, globalConfig = this.globalConfig;
            console.log("I ".concat(unchecked ? 'uncheck' : 'check', " checked the ").concat(elementKey, " check box|radio button"));
            elementIdentifier = (0, _webElementHelper.getElementLocator)(page, elementKey, globalConfig); // console.log(`check ${checked}`);
            // console.log(`unchecked ${unchecked}`);

            _context2.next = 5;
            return (0, _waitForBehaviour.waitFor)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var result;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return page.waitForSelector(elementIdentifier, {
                        state: 'visible'
                      });

                    case 2:
                      result = _context.sent;

                      if (!result) {
                        _context.next = 12;
                        break;
                      }

                      console.log("test ".concat(!!unchecked));

                      if (!unchecked) {
                        _context.next = 10;
                        break;
                      }

                      _context.next = 8;
                      return (0, _htmlBehaviour.uncheckElement)(page, elementIdentifier);

                    case 8:
                      _context.next = 12;
                      break;

                    case 10:
                      _context.next = 12;
                      return (0, _htmlBehaviour.checkElement)(page, elementIdentifier);

                    case 12:
                      return _context.abrupt("return", result);

                    case 13:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());