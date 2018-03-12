"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationContainer = undefined;

var _Authenticator = require("./Authenticator");

Object.defineProperty(exports, "AuthenticationContainer", {
  enumerable: true,
  get: function () {
    function get() {
      return _Authenticator.AuthenticationContainer;
    }

    return get;
  }()
});

var _Authenticator2 = _interopRequireDefault(_Authenticator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _Authenticator2["default"];