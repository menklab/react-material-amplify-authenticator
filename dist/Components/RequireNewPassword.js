"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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
      height: "180px"
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

var RequireNewPassword = function (_AuthPiece) {
  (0, _inherits3["default"])(RequireNewPassword, _AuthPiece);

  function RequireNewPassword(props, context) {
    var _this2 = this;

    (0, _classCallCheck3["default"])(this, RequireNewPassword);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (RequireNewPassword.__proto__ || Object.getPrototypeOf(RequireNewPassword)).call(this, props, context));

    _this.handleSubmit = function () {
      var _ref = (0, _asyncToGenerator3["default"])( /*#__PURE__*/_regenerator2["default"].mark(function () {
        function _callee(e) {
          var inputs, user, password, requiredAttributes;
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
                    user = _this.props.authData;
                    password = inputs.password;
                    requiredAttributes = user.challengeParam.requiredAttributes;

                    _awsAmplify.Auth.completeNewPassword(user, password, requiredAttributes).then(function () {
                      _this.changeState('signedIn');
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

                  case 8:
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

      if (inputs.password == null || inputs.password === "") return false;

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

    _this.state = defaultState;

    _this.validAuthStates = [_Authenticator.AUTH_STATES.requireNewPassword];

    return _this;
  }

  (0, _createClass3["default"])(RequireNewPassword, [{
    key: "render",
    value: function () {
      function render() {
        var _this3 = this;

        var _state = this.state,
            inputs = _state.inputs,
            error = _state.error,
            shake = _state.shake,
            busy = _state.busy;
        var _props = this.props,
            classes = _props.classes,
            authState = _props.authState,
            hide = _props.hide,
            errorColor = _props.errorColor,
            background = _props.background;

        // if we are signed in then do not render

        if (hide && hide.includes(RequireNewPassword)) {
          return null;
        }
        if (!this.validAuthStates.includes(authState)) {
          return null;
        }

        return _react2["default"].createElement(
          _Authenticator.AuthenticationContainer,
          { background: background },
          _react2["default"].createElement(
            "div",
            { className: classes.root },
            _react2["default"].createElement(
              _Typography2["default"],
              { variant: "title", className: classes.title },
              "New Password Required"
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
                id: "password",
                label: "Password",
                type: "password",
                autoFocus: true,
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
                "Change Password"
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
          )
        );
      }

      return render;
    }()
  }]);
  return RequireNewPassword;
}(_Auth.AuthPiece);

RequireNewPassword.propTypes = {
  classes: _propTypes2["default"].object.isRequired,
  onStateChange: _propTypes2["default"].func.isRequired,
  errorColor: _propTypes2["default"].string.isRequired,
  background: _propTypes2["default"].string
};

exports["default"] = (0, _styles.withStyles)(styles)(RequireNewPassword);