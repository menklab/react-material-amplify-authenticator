"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationContainer = exports.AUTH_STATES = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

exports.PermissionsRequireOne = PermissionsRequireOne;
exports.PermissionsRequireAll = PermissionsRequireAll;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _index = require("@material-ui/core/styles/index");

var _SignIn = require("./Components/SignIn");

var _SignIn2 = _interopRequireDefault(_SignIn);

var _ForgotPassword = require("./Components/ForgotPassword");

var _ForgotPassword2 = _interopRequireDefault(_ForgotPassword);

var _RequireNewPassword = require("./Components/RequireNewPassword");

var _RequireNewPassword2 = _interopRequireDefault(_RequireNewPassword);

var _Paper = require("@material-ui/core/Paper/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _AmplifyMessageMap = require("aws-amplify-react/dist/AmplifyMessageMap");

var _AmplifyMessageMap2 = _interopRequireDefault(_AmplifyMessageMap);

var _awsAmplify = require("aws-amplify");

var _awsAmplify2 = _interopRequireDefault(_awsAmplify);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AUTH_STATES = exports.AUTH_STATES = {
  signIn: "signIn",
  signUp: "signUp",
  confirmSignIn: "confirmSignIn",
  confirmSignUp: "confirmSignUp",
  forgotPassword: "forgotPassword",
  requireNewPassword: "requireNewPassword",
  verifyContact: "verifyContact",
  signedIn: "signedIn",
  signedOut: "signedOut"
};

var styles = function styles(theme) {
  return {
    authenticatorContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      overflow: "auto",
      position: "absolute"
    },
    authenticationPaper: {
      position: "absolute",
      flexDirection: "column",
      marginTop: "80px",
      width: "50%",
      maxWidth: "450px",
      minWidth: "300px"
    }
  };
};

var defaultState = {
  errorColor: "#ff5722",
  authState: AUTH_STATES.signIn,
  authData: null,
  error: null,
  permissions: []
};

function PermissionsRequireOne(permissions, groups) {
  for (var p = 0; p < permissions.length; p++) {
    for (var g = 0; g < groups.length; g++) {
      if (permissions[p] === groups[g]) {
        return true;
      }
    }
  }
  return false;
}

function PermissionsRequireAll(permissions, groups) {

  var notAll = permissions.length;
  for (var p = 0; p < permissions.length; p++) {
    for (var g = 0; g < groups.length; g++) {
      if (permissions[p] === groups[g]) {
        notAll--;
      }
    }
  }

  return notAll < 0;
}

var Authenticator = function (_Component) {
  (0, _inherits3["default"])(Authenticator, _Component);

  function Authenticator(props, context) {
    (0, _classCallCheck3["default"])(this, Authenticator);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (Authenticator.__proto__ || Object.getPrototypeOf(Authenticator)).call(this, props, context));

    _this.handleStateChange = function (state, data) {
      if (state === _this.state.authState) {
        return;
      }

      if (state === AUTH_STATES.signedOut) {
        state = AUTH_STATES.signIn;
      }

      var permissions = _this.state.permissions;
      if (state === AUTH_STATES.signedIn && !!data) {
        permissions = data.signInUserSession.accessToken.payload["cognito:groups"];
      }

      _this.setState({ authState: state, authData: data, permissions: [].concat((0, _toConsumableArray3["default"])(permissions)), error: null });
      if (_this.props.onStateChange) {
        _this.props.onStateChange(state, data);
      }
    };

    _this.handleAuthEvent = function (state, event) {
      if (event.type === 'error') {
        var map = _this.props.errorMessage || _AmplifyMessageMap2["default"];
        var message = typeof map === 'string' ? map : map(event.data);
        _this.setState({ error: message });
      }
    };

    _this.errorRenderer = function (err) {
      return _react2["default"].createElement(
        "h1",
        null,
        "there was an error"
      );
    };

    _awsAmplify2["default"].configure({
      Auth: {
        region: props.awsAuthRegion, // REQUIRED - Amazon Cognito Region
        userPoolId: props.userPoolId, // OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: props.clientAppId // User Pool App Client ID
      }
    });

    _this.state = Object.assign({}, defaultState, {
      errorColor: !!_this.props.errorColor ? _this.props.errorColor : defaultState.errorColor
    });
    _this.state = defaultState;
    return _this;
  }

  (0, _createClass3["default"])(Authenticator, [{
    key: "componentDidMount",
    value: function () {
      function componentDidMount() {
        this.checkUser();
      }

      return componentDidMount;
    }()
  }, {
    key: "checkUser",
    value: function () {
      function checkUser() {
        var _this2 = this;

        return _awsAmplify.Auth.currentAuthenticatedUser().then(function (user) {
          var state = user ? AUTH_STATES.signedIn : AUTH_STATES.signIn;
          _this2.handleStateChange(state, user);
        })["catch"](function (err) {
          _this2.handleStateChange(AUTH_STATES.signIn);
        });
      }

      return checkUser;
    }()
  }, {
    key: "render",
    value: function () {
      function render() {
        var _this3 = this;

        var _state = this.state,
            authState = _state.authState,
            authData = _state.authData,
            permissions = _state.permissions,
            errorColor = _state.errorColor;
        var _props = this.props,
            hideDefault = _props.hideDefault,
            hide = _props.hide,
            federated = _props.federated,
            background = _props.background,
            clearLocalStorage = _props.clearLocalStorage;

        if (!hide) {
          hide = [];
        }
        if (hideDefault) {
          hide = hide.concat([_SignIn2["default"]]);
        }

        var props_children = this.props.children || [];
        var default_children = [_react2["default"].createElement(_SignIn2["default"], { federated: federated, errorColor: errorColor, clearLocalStorage: clearLocalStorage }), _react2["default"].createElement(_RequireNewPassword2["default"], { errorColor: errorColor }), _react2["default"].createElement(_ForgotPassword2["default"], { errorColor: errorColor })];

        var children = default_children.concat(props_children);
        var render_children = _react2["default"].Children.map(children, function (child) {
          return _react2["default"].cloneElement(child, {
            authState: authState,
            authData: authData,
            background: background,
            permissions: permissions,
            onStateChange: _this3.handleStateChange,
            onAuthEvent: _this3.handleAuthEvent,
            hide: hide
          });
        });

        var errorRenderer = this.props.errorRenderer || this.errorRenderer;
        var error = this.state.error;

        return _react2["default"].createElement(
          "div",
          null,
          render_children,
          error ? errorRenderer(error) : null
        );
      }

      return render;
    }()
  }]);
  return Authenticator;
}(_react.Component);

Authenticator.propTypes = {
  awsAuthRegion: _propTypes2["default"].string.isRequired,
  userPoolId: _propTypes2["default"].string.isRequired,
  clientAppId: _propTypes2["default"].string.isRequired
};

exports["default"] = (0, _index.withStyles)(styles)(Authenticator);

var _AuthenticationContainer = function (_Component2) {
  (0, _inherits3["default"])(_AuthenticationContainer, _Component2);

  function _AuthenticationContainer() {
    (0, _classCallCheck3["default"])(this, _AuthenticationContainer);
    return (0, _possibleConstructorReturn3["default"])(this, (_AuthenticationContainer.__proto__ || Object.getPrototypeOf(_AuthenticationContainer)).apply(this, arguments));
  }

  (0, _createClass3["default"])(_AuthenticationContainer, [{
    key: "render",
    value: function () {
      function render() {
        var _props2 = this.props,
            children = _props2.children,
            classes = _props2.classes,
            background = _props2.background;

        return _react2["default"].createElement(
          "div",
          null,
          _react2["default"].createElement(
            "div",
            { className: classes.authenticatorContainer, style: background ? { background: background } : null },
            _react2["default"].createElement(
              _Paper2["default"],
              { className: classes.authenticationPaper },
              children
            )
          )
        );
      }

      return render;
    }()
  }]);
  return _AuthenticationContainer;
}(_react.Component);

Authenticator.propTypes = {
  background: _propTypes2["default"].string
};

var AuthenticationContainer = exports.AuthenticationContainer = (0, _index.withStyles)(styles)(_AuthenticationContainer);