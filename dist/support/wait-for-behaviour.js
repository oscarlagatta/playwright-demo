"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitFor = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
*
* So the way the waitFor works is, basically it surrounds our assertion.
*
* is taking in a promise, and that promise will either resolve a true if the assertions
* is correct, e.g. the X is displayed on the screen; or it will return a false.
*
* But the way it works is that basically it will take in that promise. Then we're going to go ahead;
* and we're going to set a const
* const { timeout = 30000, wait = 2000 } = options || {};
* So in plain speak, it's a 30' second timeout and a 2' second wait.
*
* Then we proceed to
* const sleep = (ms: number) =>  new Promise(resolve => setTimeout(resolve, ms));
* This is basically setting a new sleep, and it's going to resolve the promise when timeout resolves.
*
* Then the  const startDate = new Date(); is basically saying grab the current date and store that as an object.
* But more importantly, it's going to store the time
*
*
* while (new Date().getTime() - startDate.getTime() < timeout) {
* if the time difference between our get time when we start the loop and the stop time
* when we actually defined our start date object if the difference is more than 30 seconds, then it
* knows to exit the loop and effectively throw the error.
*
* const result = await predicate();
* The type predicate, the always attached to a function that takes a single argument e.g. our promise
* and returns a boolean.
* if (result) return result; So if it's true returns result.
* then return us to our step and then pass the step.
* However, on if (result) return result;, if after 30 seconds and two second tries.So 15 retry total it will
* throw an error.
* */
var waitFor = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(predicate, options) {
    var _ref2, _ref2$timeout, timeout, _ref2$wait, wait, sleep, startDate, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = options || {}, _ref2$timeout = _ref2.timeout, timeout = _ref2$timeout === void 0 ? 20000 : _ref2$timeout, _ref2$wait = _ref2.wait, wait = _ref2$wait === void 0 ? 2000 : _ref2$wait;

            sleep = function sleep(ms) {
              return new Promise(function (resolve) {
                return setTimeout(resolve, ms);
              });
            };

            startDate = new Date();

          case 3:
            if (!(new Date().getTime() - startDate.getTime() < timeout)) {
              _context.next = 13;
              break;
            }

            _context.next = 6;
            return predicate();

          case 6:
            result = _context.sent;

            if (!result) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", result);

          case 9:
            _context.next = 11;
            return sleep(wait);

          case 11:
            _context.next = 3;
            break;

          case 13:
            throw new Error("Wait time of ".concat(timeout, "ms exceeded"));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function waitFor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.waitFor = waitFor;