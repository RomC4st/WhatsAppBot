'use strict';
require("babel-core/register");
require("babel-polyfill");
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _googleapis = require('googleapis');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _twilio = require('twilio');

var _twilio2 = _interopRequireDefault(_twilio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var _process$env = process.env,
    accountSid = _process$env.SID,
    TwilloAuthToken = _process$env.KEY,
    googleApiKey = _process$env.APIKEY,
    cx = _process$env.CX;


(0, _twilio2.default)(accountSid, TwilloAuthToken);
var MessagingResponse = _twilio2.default.twiml.MessagingResponse;

var customsearch = _googleapis.google.customsearch('v1');

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */

var WhatsappBot = function () {
  function WhatsappBot() {
    _classCallCheck(this, WhatsappBot);
  }

  _createClass(WhatsappBot, null, [{
    key: 'googleSearch',

    /**
     * @memberof WhatsappBot
     * @param {object} req - Request sent to the route
     * @param {object} res - Response sent from the controller
     * @param {object} next - Error handler
     * @returns {object} - object representing response message
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var twiml, q, options, result, firstResult, searchData, link;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                twiml = new MessagingResponse();
                q = req.body.Body;
                options = { cx: cx, q: q, auth: googleApiKey };
                _context.prev = 3;
                _context.next = 6;
                return customsearch.cse.list(options);

              case 6:
                result = _context.sent;
                firstResult = result.data.items[0];
                searchData = firstResult.snippet;
                link = firstResult.link;


                twiml.message(searchData + ' ' + link);

                res.set('Content-Type', 'text/xml');

                return _context.abrupt('return', res.status(200).send(twiml.toString()));

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](3);
                return _context.abrupt('return', next(_context.t0));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 15]]);
      }));

      function googleSearch(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return googleSearch;
    }()
  }]);

  return WhatsappBot;
}();

exports.default = WhatsappBot;