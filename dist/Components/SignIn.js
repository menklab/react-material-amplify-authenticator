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

var _awsAmplify = require("aws-amplify");

var _Paper = require("material-ui/Paper/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Zoom = require("material-ui/transitions/Zoom");

var _Zoom2 = _interopRequireDefault(_Zoom);

var _ShakeButton = require("./ShakeButton/ShakeButton");

var _ShakeButton2 = _interopRequireDefault(_ShakeButton);

var _Button = require("material-ui/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Authenticator = require("../Authenticator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    form: {
      marginTop: theme.spacing.unit * 3,
      height: "250px"
    },
    primaryButton: {
      marginTop: theme.spacing.unit * 3
    },
    title: {
      color: theme.palette.primary.main
    },
    errorPaper: theme.mixins.gutters({
      marginTop: theme.spacing.unit * 3,
      justifyContent: "center"
    }),
    errorMessage: {
      display: "inline"
    },
    bottomLinks: theme.mixins.gutters({
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3
    })
  };
};

var defaultState = {
  inputs: {},
  error: null,
  busy: false,
  shake: false
};

var SignIn = function (_AuthPiece) {
  _inherits(SignIn, _AuthPiece);

  function SignIn(props, context) {
    var _this2 = this;

    _classCallCheck(this, SignIn);

    var _this = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props, context));

    _this.handleSubmit = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function () {
        function _callee(e) {
          var inputs;
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

                    _awsAmplify.Auth.signIn(inputs.username, inputs.password).then(function (user) {
                      _this.setState(Object.assign({}, defaultState, {
                        inputs: Object.assign({}, defaultState.inputs, {
                          username: inputs.username
                        })
                      }));
                      if (user.challengeName === 'SMS_MFA') {
                        _this.changeState(_Authenticator.AUTH_STATES.confirmSignIn, user);
                      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {

                        _this.changeState(_Authenticator.AUTH_STATES.requireNewPassword, user);
                      } else {
                        _this.checkContact(user);
                      }
                    })["catch"](function (err) {
                      _this.setState(Object.assign({}, defaultState, {
                        shake: true,
                        error: err,
                        inputs: Object.assign({}, defaultState.inputs, {
                          username: inputs.username
                        })
                      }));
                      setTimeout(function () {
                        this.setState({ shake: false });
                      }.bind(_this), 1000);
                    });

                  case 5:
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

    _this.validForm = function () {
      var inputs = _this.state.inputs;

      if (inputs.username == null || inputs.username === "") return false;
      if (inputs.password == null || inputs.password === "") return false;

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

    _this.state = defaultState;

    _this.validAuthStates = [_Authenticator.AUTH_STATES.signIn, _Authenticator.AUTH_STATES.signedOut];

    return _this;
  }

  _createClass(SignIn, [{
    key: "checkContact",
    value: function () {
      function checkContact(user) {
        var _this3 = this;

        _awsAmplify.Auth.verifiedContact(user).then(function (data) {
          if (!_awsAmplify.JS.isEmpty(data.verified)) {
            _this3.changeState(_Authenticator.AUTH_STATES.signedIn, user);
          } else {
            user = Object.assign(user, data);
            _this3.changeState(_Authenticator.AUTH_STATES.verifyContact, user);
          }
        })["catch"](function (err) {
          _this3.handleStateChange(_Authenticator.AUTH_STATES.signIn);
        });
      }

      return checkContact;
    }()
  }, {
    key: "render",
    value: function () {
      function render() {
        var _this4 = this;

        var _state = this.state,
            inputs = _state.inputs,
            error = _state.error,
            shake = _state.shake,
            busy = _state.busy;
        var _props = this.props,
            classes = _props.classes,
            authState = _props.authState,
            hide = _props.hide,
            errorColor = _props.errorColor;

        // if we are signed in then do not render

        if (hide && hide.includes(SignIn)) {
          return null;
        }
        if (!this.validAuthStates.includes(authState)) {
          return null;
        }

        return _react2["default"].createElement(
          _Authenticator.AuthenticationContainer,
          null,
          _react2["default"].createElement(
            "div",
            { className: classes.root },
            _react2["default"].createElement(
              _Typography2["default"],
              { variant: "title", className: classes.title },
              "Log In To Your Account"
            ),
            _react2["default"].createElement(
              "form",
              {
                className: classes.form,
                noValidate: true,
                autoComplete: "off",
                onSubmit: this.handleSubmit
              },
              _react2["default"].createElement(_TextField2["default"], {
                autoFocus: true,
                id: "username",
                label: "Email / Phone",
                className: classes.textField,
                type: "text",
                value: inputs.username || '',
                onChange: this.handleChange("username"),
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
                onChange: this.handleChange("password"),
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
                  disabled: !this.validForm(),
                  type: "submit",
                  fullWidth: true,
                  shake: shake,
                  busy: busy
                },
                "Sign In"
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
          ),
          _react2["default"].createElement(
            _Typography2["default"],
            { className: classes.bottomLinks, variant: "body1" },
            _react2["default"].createElement(
              _Button2["default"],
              {
                color: "primary",
                onClick: function () {
                  function onClick(e) {
                    e.preventDefault();
                    _this4.changeState(_Authenticator.AUTH_STATES.forgotPassword);
                  }

                  return onClick;
                }()
              },
              "Forgot Password"
            )
          )
        );
      }

      return render;
    }()
  }]);

  return SignIn;
}(_Auth.AuthPiece);

SignIn.propTypes = {
  classes: _propTypes2["default"].object.isRequired,
  onStateChange: _propTypes2["default"].func.isRequired,
  errorColor: _propTypes2["default"].string.isRequired
};

exports["default"] = (0, _styles.withStyles)(styles)(SignIn);