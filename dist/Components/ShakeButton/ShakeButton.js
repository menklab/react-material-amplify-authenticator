"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _styles = require("@material-ui/core/styles");

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CircularProgress = require("@material-ui/core/CircularProgress");

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

require("./shakeButton.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = function styles(theme) {
  return {
    indicatorStyle: {
      color: theme.palette.primary.contrastText
    }
  };
};

var ShakeButton = function (_React$Component) {
  (0, _inherits3["default"])(ShakeButton, _React$Component);

  function ShakeButton(props, context) {
    (0, _classCallCheck3["default"])(this, ShakeButton);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (ShakeButton.__proto__ || Object.getPrototypeOf(ShakeButton)).call(this, props, context));

    _this.state = {
      shake: false,
      busy: false
    };
    return _this;
  }

  (0, _createClass3["default"])(ShakeButton, [{
    key: "render",
    value: function () {
      function render() {
        var _props = this.props,
            classes = _props.classes,
            children = _props.children,
            busy = _props.busy,
            shake = _props.shake,
            other = (0, _objectWithoutProperties3["default"])(_props, ["classes", "children", "busy", "shake"]);


        return _react2["default"].createElement(
          _Button2["default"],
          (0, _extends3["default"])({}, other, {
            className: (this.state.shake ? "btn-animate-shake " : "") + this.props.className
          }),
          this.state.busy ? _react2["default"].createElement(_CircularProgress2["default"], { className: classes.indicatorStyle, size: 20 }) : children
        );
      }

      return render;
    }()
  }, {
    key: "componentWillReceiveProps",
    value: function () {
      function componentWillReceiveProps(nextProps) {
        this.setState({
          busy: nextProps.busy,
          shake: nextProps.shake
        });
      }

      return componentWillReceiveProps;
    }()
  }]);
  return ShakeButton;
}(_react2["default"].Component);

ShakeButton.propTypes = {
  classes: _propTypes2["default"].object.isRequired,
  shake: _propTypes2["default"].bool.isRequired,
  busy: _propTypes2["default"].bool.isRequired
};

exports["default"] = (0, _styles.withStyles)(styles)(ShakeButton);