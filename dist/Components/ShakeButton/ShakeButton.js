"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("material-ui/styles");

var _Button = require("material-ui/Button");

var _Button2 = _interopRequireDefault(_Button);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Progress = require("material-ui/Progress");

require("./shakeButton.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    indicatorStyle: {
      color: theme.palette.primary.contrastText
    }
  };
};

var ShakeButton = function (_React$Component) {
  _inherits(ShakeButton, _React$Component);

  function ShakeButton(props, context) {
    _classCallCheck(this, ShakeButton);

    var _this = _possibleConstructorReturn(this, (ShakeButton.__proto__ || Object.getPrototypeOf(ShakeButton)).call(this, props, context));

    _this.state = {
      shake: false,
      busy: false
    };
    return _this;
  }

  _createClass(ShakeButton, [{
    key: "render",
    value: function () {
      function render() {
        var _props = this.props,
            classes = _props.classes,
            children = _props.children,
            busy = _props.busy,
            shake = _props.shake,
            other = _objectWithoutProperties(_props, ["classes", "children", "busy", "shake"]);

        return _react2["default"].createElement(
          _Button2["default"],
          _extends({}, other, {
            className: (this.state.shake ? "btn-animate-shake " : "") + this.props.className
          }),
          this.state.busy ? _react2["default"].createElement(_Progress.CircularProgress, { className: classes.indicatorStyle, size: 20 }) : children
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