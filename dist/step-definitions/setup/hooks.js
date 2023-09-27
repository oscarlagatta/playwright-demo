"use strict";

var _cucumber = require("@cucumber/cucumber");

var _parseEnv = require("../../env/parseEnv");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _cucumber.setDefaultTimeout)((0, _parseEnv.envNumber)('SCRIPT_TIMEOUT'));
(0, _cucumber.Before)( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(scenario) {
    var contextOptions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // console.log(`running cucumber scenario ${scenario.pickle.name}`);
            contextOptions = {
              ignoreHTTPSErrors: true,
              recordVideo: {
                dir: "".concat((0, _parseEnv.env)('VIDEO_PATH')).concat(scenario.pickle.name)
              }
            };
            _context.next = 3;
            return this.init(contextOptions);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
(0, _cucumber.After)( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(scenario) {
    var _scenario$result;

    var _this$screen, page, browser, scenarioStatus, screenshot;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _this$screen = this.screen, page = _this$screen.page, browser = _this$screen.browser;
            scenarioStatus = (_scenario$result = scenario.result) === null || _scenario$result === void 0 ? void 0 : _scenario$result.status;

            if (!(scenarioStatus === 'FAILED')) {
              _context2.next = 8;
              break;
            }

            _context2.next = 5;
            return page.screenshot({
              path: "".concat((0, _parseEnv.env)('SCREENSHOT_PATH')).concat(scenario.pickle.name, ".png")
            });

          case 5:
            screenshot = _context2.sent;
            _context2.next = 8;
            return this.attach(screenshot, 'image/png');

          case 8:
            _context2.next = 10;
            return browser.close();

          case 10:
            return _context2.abrupt("return", browser);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());