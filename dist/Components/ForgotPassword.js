"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Auth = require("aws-amplify-react/dist/Auth");

var _styles = require("material-ui/styles");

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Typography = require("material-ui/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Button = require("material-ui/Button");

var _Button2 = _interopRequireDefault(_Button);

var _awsAmplify = require("aws-amplify");

var _Paper = require("material-ui/Paper/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Zoom = require("material-ui/transitions/Zoom");

var _Zoom2 = _interopRequireDefault(_Zoom);

var _ShakeButton = require("./ShakeButton/ShakeButton");

var _ShakeButton2 = _interopRequireDefault(_ShakeButton);

var _Authenticator = require("../Authenticator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    root: theme.mixins.gutters({
      marginTop: theme.spacing.unit * 3
    }),
    textField: {
      width: "100%"
    },
    formRequest: {
      marginTop: theme.spacing.unit * 3,
      height: "250px"
    },
    formSubmit: {
      marginTop: theme.spacing.unit * 3,
      height: "330px"
    },
    primaryButton: {
      marginTop: theme.spacing.unit * 3
    },
    secondaryButton: {
      marginTop: theme.spacing.unit * 3
    },
    successButton: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3
    },
    title: {
      color: theme.palette.primary.main
    },
    subTitle: {
      marginTop: theme.spacing.unit,
      color: "rgba(0, 0, 0, 0.54)"
    },
    errorPaper: theme.mixins.gutters({
      marginTop: theme.spacing.unit * 3,
      justifyContent: "center"
    }),
    errorMessage: {
      color: undefined.props.errorColor,
      display: "inline"
    },
    bottomLinks: theme.mixins.gutters({
      display: "flex",
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      justifyContent: "space-between"
    })
  };
};

var FORGOT_PASSWORD_STATE = {
  request_code: "request_code",
  submit_reset: "submit_reset",
  success: "success"
};

var defaultState = {
  inputs: {},
  error: null,
  busy: false,
  shake: false,
  view: FORGOT_PASSWORD_STATE.request_code,
  delivery: {}
};

var ForgotPassword = function (_AuthPiece) {
  _inherits(ForgotPassword, _AuthPiece);

  function ForgotPassword(props, context) {
    var _this2 = this;

    _classCallCheck(this, ForgotPassword);

    var _this = _possibleConstructorReturn(this, (ForgotPassword.__proto__ || Object.getPrototypeOf(ForgotPassword)).call(this, props, context));

    _this.handleRequest = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function () {
        function _callee(e) {
          var inputs, username;
          return regeneratorRuntime.wrap(function () {
            function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    e.stopPropagation();
                    e.preventDefault();
                    _this.setState({
                      busy: true,
                      shake: false,
                      error: null
                    });
                    inputs = _this.state.inputs;
                    username = inputs.username;

                    _awsAmplify.Auth.forgotPassword(username).then(function (data) {
                      _this.setState({
                        delivery: data.CodeDeliveryDetails
                      });
                      _this.setState({
                        busy: false,
                        view: FORGOT_PASSWORD_STATE.submit_reset
                      });
                    })["catch"](function (err) {
                      _this.setState({
                        busy: false,
                        shake: true,
                        error: err
                      });
                      setTimeout(function () {
                        this.setState({ shake: false });
                      }.bind(_this), 1000);
                    });

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }

            return _callee$;
          }(), _callee, _this2);
        }

        return _callee;
      }()));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.handleSubmit = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function () {
        function _callee2(e) {
          var inputs, username, code, password;
          return regeneratorRuntime.wrap(function () {
            function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    e.stopPropagation();
                    e.preventDefault();
                    _this.setState({
                      busy: true,
                      shake: false,
                      error: null
                    });
                    inputs = _this.state.inputs;
                    username = inputs.username, code = inputs.code, password = inputs.password;

                    _awsAmplify.Auth.forgotPasswordSubmit(username, code, password).then(function () {
                      _this.setState.apply(_this, _toConsumableArray(defaultState).concat([{
                        view: FORGOT_PASSWORD_STATE.success
                      }]));
                    })["catch"](function (err) {
                      _this.setState({
                        busy: false,
                        shake: true,
                        error: err
                      });
                      setTimeout(function () {
                        this.setState({ shake: false });
                      }.bind(_this), 1000);
                    });

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            }

            return _callee2$;
          }(), _callee2, _this2);
        }

        return _callee2;
      }()));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.validForm = function () {
      var _this$state = _this.state,
          inputs = _this$state.inputs,
          view = _this$state.view;


      if (view === FORGOT_PASSWORD_STATE.request_code) {
        if (inputs.username == null || inputs.username === "") return false;
      }

      if (view === FORGOT_PASSWORD_STATE.submit_reset) {
        if (inputs.username == null || inputs.username === "") return false;
        if (inputs.code == null || inputs.code === "") return false;
        if (inputs.password == null || inputs.password === "") return false;
      }
      return true;
    };

    _this.handleChange = function (name) {
      return function (event) {
        event.persist();
        _this.setState(function (prevState) {
          return {
            inputs: Object.assign({}, prevState.inputs, _defineProperty({}, name, event.target.value))
          };
        });
      };
    };

    _this.successView = function () {
      var classes = _this.props.classes;


      return _react2["default"].createElement(
        "div",
        { className: classes.root },
        _react2["default"].createElement(
          _Typography2["default"],
          { variant: "title", className: classes.title },
          "Password Reset Successful"
        ),
        _react2["default"].createElement(
          _Typography2["default"],
          { variant: "body1", className: classes.subTitle },
          "Your password has been successfully reset. You can now proceed to log in."
        ),
        _react2["default"].createElement(
          _Button2["default"],
          {
            variant: "raised",
            color: "primary",
            className: classes.successButton,
            fullWidth: true,
            onClick: function () {
              function onClick(e) {
                e.preventDefault();
                _this.setState(defaultState);
                _this.changeState(_Authenticator.AUTH_STATES.signIn);
              }

              return onClick;
            }()
          },
          "Log In"
        )
      );
    };

    _this.submitView = function () {
      var classes = _this.props.classes;
      var _this$state2 = _this.state,
          inputs = _this$state2.inputs,
          error = _this$state2.error,
          shake = _this$state2.shake,
          busy = _this$state2.busy;


      return _react2["default"].createElement(
        "div",
        { className: classes.root },
        _react2["default"].createElement(
          _Typography2["default"],
          { variant: "title", className: classes.title },
          "Password Reset"
        ),
        _react2["default"].createElement(
          _Typography2["default"],
          { variant: "body1", className: classes.subTitle },
          "Enter the reset code that was sent to you to finish resetting your password."
        ),
        _react2["default"].createElement(
          "form",
          {
            className: classes.formSubmit,
            noValidate: true,
            autoComplete: "off",
            onSubmit: _this.handleSubmit
          },
          _react2["default"].createElement(_TextField2["default"], {
            id: "username",
            label: "Email / Phone",
            className: classes.textField,
            value: inputs.username || '',
            onChange: _this.handleChange("username"),
            margin: "normal",
            autoFocus: true,
            InputLabelProps: {
              shrink: true
            }
          }),
          _react2["default"].createElement(_TextField2["default"], {
            autoFocus: true,
            id: "code",
            label: "Reset Code",
            className: classes.textField,
            type: "text",
            value: inputs.code || '',
            onChange: _this.handleChange("code"),
            margin: "normal",
            InputLabelProps: {
              shrink: true
            }
          }),
          _react2["default"].createElement(_TextField2["default"], {
            id: "password",
            label: "Password",
            type: "password",
            className: classes.textField,
            value: inputs.password || '',
            onChange: _this.handleChange("password"),
            margin: "normal",
            InputLabelProps: {
              shrink: true
            }
          }),
          _react2["default"].createElement(
            _ShakeButton2["default"],
            {
              variant: "raised",
              color: "primary",
              className: classes.primaryButton,
              disabled: !_this.validForm(),
              type: "submit",
              fullWidth: true,
              shake: shake,
              busy: busy
            },
            "Reset Password"
          ),
          !!error ? _react2["default"].createElement(
            _Zoom2["default"],
            { direction: "right", "in": !!error, mountOnEnter: true, unmountOnExit: true },
            _react2["default"].createElement(
              _Paper2["default"],
              { className: classes.errorPaper, elevation: 0 },
              _react2["default"].createElement(
                _Typography2["default"],
                { variant: "body2", className: classes.errorMessage },
                error.message
              )
            )
          ) : null
        )
      );
    };

    _this.requestView = function () {
      var classes = _this.props.classes;
      var _this$state3 = _this.state,
          inputs = _this$state3.inputs,
          error = _this$state3.error,
          shake = _this$state3.shake,
          busy = _this$state3.busy;


      return _react2["default"].createElement(
        "div",
        { className: classes.root },
        _react2["default"].createElement(
          _Typography2["default"],
          { variant: "title", className: classes.title },
          "Password Reset"
        ),
        _react2["default"].createElement(
          _Typography2["default"],
          { variant: "body1", className: classes.subTitle },
          "Enter the email or phone number attached to your account to receive a password reset code."
        ),
        _react2["default"].createElement(
          "form",
          {
            className: classes.formRequest,
            noValidate: true,
            autoComplete: "off",
            onSubmit: _this.handleRequest
          },
          _react2["default"].createElement(_TextField2["default"], {
            id: "username",
            label: "Email / Phone",
            className: classes.textField,
            value: inputs.username || '',
            onChange: _this.handleChange("username"),
            margin: "normal",
            autoFocus: true,
            InputLabelProps: {
              shrink: true
            }
          }),
          _react2["default"].createElement(
            _ShakeButton2["default"],
            {
              variant: "raised",
              color: "primary",
              className: classes.primaryButton,
              disabled: !_this.validForm(),
              type: "submit",
              fullWidth: true,
              shake: shake,
              busy: busy
            },
            "Request Reset Code"
          ),
          _react2["default"].createElement(
            _Button2["default"],
            {
              variant: "raised",
              color: "primary",
              className: classes.secondaryButton,
              fullWidth: true,
              onClick: function () {
                function onClick(e) {
                  e.preventDefault();
                  _this.setState({ view: FORGOT_PASSWORD_STATE.submit_reset });
                }

                return onClick;
              }()
            },
            "Already Have A Code"
          ),
          !!error ? _react2["default"].createElement(
            _Zoom2["default"],
            { direction: "right", "in": !!error, mountOnEnter: true, unmountOnExit: true },
            _react2["default"].createElement(
              _Paper2["default"],
              { className: classes.errorPaper, elevation: 0 },
              _react2["default"].createElement(
                _Typography2["default"],
                { variant: "body2", className: classes.errorMessage },
                error.message
              )
            )
          ) : null
        )
      );
    };

    _this.state = defaultState;

    _this.validAuthStates = [_Authenticator.AUTH_STATES.forgotPassword];

    return _this;
  }

  _createClass(ForgotPassword, [{
    key: "render",
    value: function () {
      function render() {
        var _this3 = this;

        var view = this.state.view;
        var _props = this.props,
            authState = _props.authState,
            hide = _props.hide,
            classes = _props.classes;

        // if we are signed in then do not render

        if (hide && hide.includes(ForgotPassword)) {
          return null;
        }
        if (!this.validAuthStates.includes(authState)) {
          return null;
        }

        return _react2["default"].createElement(
          _Authenticator.AuthenticationContainer,
          null,
          view === FORGOT_PASSWORD_STATE.request_code ? this.requestView() : null,
          view === FORGOT_PASSWORD_STATE.submit_reset ? this.submitView() : null,
          view === FORGOT_PASSWORD_STATE.success ? this.successView() : null,
          view !== FORGOT_PASSWORD_STATE.success ? _react2["default"].createElement(
            "div",
            { className: classes.bottomLinks },
            _react2["default"].createElement(
              _Typography2["default"],
              { variant: "body1" },
              _react2["default"].createElement(
                _Button2["default"],
                { color: "primary",
                  onClick: function () {
                    function onClick(e) {
                      e.preventDefault();
                      _this3.setState(defaultState);
                      _this3.changeState(_Authenticator.AUTH_STATES.signIn);
                    }

                    return onClick;
                  }()
                },
                "< Back To Login"
              )
            ),
            view === FORGOT_PASSWORD_STATE.submit_reset ? _react2["default"].createElement(
              _Typography2["default"],
              { variant: "body1" },
              _react2["default"].createElement(
                _Button2["default"],
                { color: "primary",
                  onClick: function () {
                    function onClick(e) {
                      e.preventDefault();
                      _this3.setState(defaultState);
                    }

                    return onClick;
                  }()
                },
                "Request New Code"
              )
            ) : null
          ) : null
        );
      }

      return render;
    }()
  }]);

  return ForgotPassword;
}(_Auth.AuthPiece);

ForgotPassword.propTypes = {
  classes: _propTypes2["default"].object.isRequired,
  onStateChange: _propTypes2["default"].func.isRequired,
  errorColor: _propTypes2["default"].string.isRequired
};

exports["default"] = (0, _styles.withStyles)(styles)(ForgotPassword);