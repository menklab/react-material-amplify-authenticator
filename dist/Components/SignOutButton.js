'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _awsAmplify = require('aws-amplify');

var _Auth = require('aws-amplify-react/dist/Auth');

var _Button = require('material-ui/Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Close = require('material-ui-icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _styles = require('material-ui/styles');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Authenticator = require('../Authenticator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4
    }
  };
};

var SignOutButton = function (_AuthPiece) {
  _inherits(SignOutButton, _AuthPiece);

  function SignOutButton(props, context) {
    _classCallCheck(this, SignOutButton);

    var _this = _possibleConstructorReturn(this, (SignOutButton.__proto__ || Object.getPrototypeOf(SignOutButton)).call(this, props, context));

    _this.handleClose = function (event, reason) {
      if (reason === 'clickaway') {
        return;
      }
      _this.setState({ open: false });
    };

    _this.handleSignOut = function () {
      _awsAmplify.Auth.signOut().then(function () {
        _this.changeState(_Authenticator.AUTH_STATES.signedOut);
      })['catch'](function (err) {
        _this.setState({
          open: true,
          message: err.message
        });
      });
    };

    _this.state = {
      open: false,
      message: ""
    };
    return _this;
  }

  _createClass(SignOutButton, [{
    key: 'render',
    value: function () {
      function render() {
        var _props = this.props,
            children = _props.children,
            classes = _props.classes,
            color = _props.color;


        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            _Button2['default'],
            { style: { "color": color }, onClick: this.handleSignOut },
            children
          ),
          _react2['default'].createElement(_Snackbar2['default'], {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            open: this.state.open,
            autoHideDuration: 6000,
            onClose: this.handleClose,
            SnackbarContentProps: {
              'aria-describedby': 'message-id'
            },
            message: _react2['default'].createElement(
              'span',
              { id: 'message-id' },
              this.state.message
            ),
            action: [_react2['default'].createElement(
              _Button2['default'],
              { key: 'undo', className: classes.close, size: 'small', onClick: this.handleClose },
              'UNDO'
            ), _react2['default'].createElement(
              _IconButton2['default'],
              {
                key: 'close',
                'aria-label': 'Close',
                color: 'inherit',
                className: classes.close,
                onClick: this.handleClose
              },
              _react2['default'].createElement(_Close2['default'], null)
            )]
          })
        );
      }

      return render;
    }()
  }]);

  return SignOutButton;
}(_Auth.AuthPiece);

SignOutButton.propTypes = {
  classes: _propTypes2['default'].object.isRequired,
  children: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].array]).isRequired,
  color: _propTypes2['default'].string
};

exports['default'] = (0, _styles.withStyles)(styles)(SignOutButton);