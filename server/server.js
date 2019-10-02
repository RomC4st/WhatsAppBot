'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === undefined ? 3000 : _process$env$PORT;


app.use((0, _cors2.default)());

app.use(_express2.default.urlencoded({
  extended: false
}));

app.use(_express2.default.json());
app.use(_routes2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

app.listen(PORT, function () {
  return console.log('App Listening on port ' + PORT);
});

exports.default = app;