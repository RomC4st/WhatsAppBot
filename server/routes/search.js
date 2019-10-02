'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _WhatsappBot = require('../controllers/WhatsappBot');

var _WhatsappBot2 = _interopRequireDefault(_WhatsappBot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var botRouter = (0, _express.Router)();

botRouter.post('/incoming', _WhatsappBot2.default.googleSearch);
//
exports.default = botRouter;