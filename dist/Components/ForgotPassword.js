"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Auth = require("aws-amplify-react/dist/Auth");

var _styles = require("@material-ui/core/styles");

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _awsAmplify = require("aws-amplify");

var _Paper = require("@material-ui/core/Paper/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Zoom = require("@material-ui/core/Zoom");

var _Zoom2 = _interopRequireDefault(_Zoom);

var _ShakeButton = require("./ShakeButton/ShakeButton");

var _ShakeButton2 = _interopRequireDefault(_ShakeButton);

var _Authenticator = require("../Authenticator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  (0, _inherits3["default"])(ForgotPassword, _AuthPiece);

  function ForgotPassword(props, context) {
    var _this2 = this;

    (0, _classCallCheck3["default"])(this, ForgotPassword);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (ForgotPassword.__proto__ || Object.getPrototypeOf(ForgotPassword)).call(this, props, context));

    _this.handleRequest = function () {
      var _ref = (0, _asyncToGenerator3["default"])( /*#__PURE__*/_regenerator2["default"].mark(function () {
        function _callee(e) {
          var inputs, username;
          return _regenerator2["default"].wrap(function () {
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
      var _ref2 = (0, _asyncToGenerator3["default"])( /*#__PURE__*/_regenerator2["default"].mark(function () {
        function _callee2(e) {
          var inputs, username, code, password;
          return _regenerator2["default"].wrap(function () {
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
                      _this.setState.apply(_this, (0, _toConsumableArray3["default"])(defaultState).concat([{
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
            inputs: Object.assign({}, prevState.inputs, (0, _defineProperty3["default"])({}, name, event.target.value))
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
      var _this$props = _this.props,
          classes = _this$props.classes,
          errorColor = _this$props.errorColor;
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
                { variant: "body2", className: classes.errorMessage, style: { "color": errorColor } },
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

  (0, _createClass3["default"])(ForgotPassword, [{
    key: "render",
    value: function () {
      function render() {
        var _this3 = this;

        var view = this.state.view;
        var _props = this.props,
            authState = _props.authState,
            hide = _props.hide,
            classes = _props.classes,
            background = _props.background;

        // if we are signed in then do not render

        if (hide && hide.includes(ForgotPassword)) {
          return null;
        }
        if (!this.validAuthStates.includes(authState)) {
          return null;
        }

        return _react2["default"].createElement(
          _Authenticator.AuthenticationContainer,
          { background: background },
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
  errorColor: _propTypes2["default"].string.isRequired,
  background: _propTypes2["default"].string
};

exports["default"] = (0, _styles.withStyles)(styles)(ForgotPassword);