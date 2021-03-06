import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles/index";
import SignIn from "./Components/SignIn"
import ForgotPassword from "./Components/ForgotPassword"
import RequireNewPassword from './Components/RequireNewPassword'
import Paper from "@material-ui/core/Paper/Paper";
import AmplifyMessageMap from 'aws-amplify-react/dist/AmplifyMessageMap';
import Amplify, {Auth} from 'aws-amplify';
import PropTypes from 'prop-types';

export const AUTH_STATES = {
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

const styles = theme => ({
  authenticatorContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "auto",
    position: "absolute",
  },
  authenticationPaper: {
    position: "absolute",
    flexDirection: "column",
    marginTop: "80px",
    width: "50%",
    maxWidth: "450px",
    minWidth: "300px",
  }
});

const defaultState = {
  errorColor: "#ff5722",
  authState: AUTH_STATES.signIn,
  authData: null,
  error: null,
  permissions: [],
  attributes: {},
};

export function PermissionsRequireOne(permissions, groups) {
  for (let p = 0; p < permissions.length; p++) {
    for (let g = 0; g < groups.length; g++) {
      if (permissions[p] === groups[g]) {
        return true
      }
    }
  }
  return false
}

export function PermissionsRequireAll(permissions, groups) {
  let notAll = permissions.length;
  for (let p = 0; p < permissions.length; p++) {
    for (let g = 0; g < groups.length; g++) {
      if (permissions[p] === groups[g]) {
        notAll--;
      }
    }
  }
  return notAll < 0
}

class Authenticator extends Component {
  constructor(props, context) {
    super(props, context);

    Amplify.configure({
      Auth: {
        region: props.awsAuthRegion, // REQUIRED - Amazon Cognito Region
        userPoolId: props.userPoolId, // OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: props.clientAppId, // User Pool App Client ID
      },
    });

    this.state = {
      ...Object.assign({}, defaultState),
      errorColor: !!this.props.errorColor ? this.props.errorColor : defaultState.errorColor,
    };
  }

  componentDidMount() {
    this.checkUser();
  }

  handleStateChange = (state, data) => {
    if (state === this.state.authState) {
      return;
    }

    if (state === AUTH_STATES.signedOut) {
      state = AUTH_STATES.signIn;
    }

    let permissions = this.state.permissions;
    if (state === AUTH_STATES.signedIn &&
      !!data &&
      !!data.signInUserSession &&
      !!data.signInUserSession.accessToken &&
      !!data.signInUserSession.accessToken.payload &&
      !!data.signInUserSession.accessToken.payload["cognito:groups"]) {
      permissions = data.signInUserSession.accessToken.payload["cognito:groups"];
    }
    else {
      permissions = [];
    }

    let attributes = this.state.attributes;
    if (state === AUTH_STATES.signedIn &&
      !!data &&
      data.attributes) {
      attributes = data.attributes;
    }
    else {
      attributes = {};
    }

    this.setState({authState: state, authData: data, permissions: [...permissions], attributes, error: null});
    if (this.props.onStateChange) {
      this.props.onStateChange(state, data);
    }
  };

  handleAuthEvent = (state, event) => {
    if (event.type === 'error') {
      const map = this.props.errorMessage || AmplifyMessageMap;
      const message = (typeof map === 'string') ? map : map(event.data);
      this.setState({error: message});
    }
  };

  errorRenderer = (err) => {
    return (
      <h1>there was an error</h1>
    )
  };

  checkUser() {
    return Auth.currentAuthenticatedUser()
      .then(user => {
        const state = user ? AUTH_STATES.signedIn : AUTH_STATES.signIn;
        this.handleStateChange(state, user);
      })
      .catch(err => {
        this.handleStateChange(AUTH_STATES.signIn);
      })
  }


  render() {
    const {authState, authData, permissions, attributes, errorColor} = this.state;

    let {hideDefault, hide, federated, background, clearLocalStorage} = this.props;
    if (!hide) {
      hide = [];
    }
    if (hideDefault) {
      hide = hide.concat([
        SignIn
      ]);
    }


    const props_children = this.props.children || [];
    const default_children = [
      <SignIn federated={federated} errorColor={errorColor} clearLocalStorage={clearLocalStorage}/>,
      <RequireNewPassword errorColor={errorColor}/>,
      <ForgotPassword errorColor={errorColor}/>
    ];

    const children = default_children.concat(props_children);
    const render_children = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        authState: authState,
        authData: authData,
        background: background,
        permissions: permissions,
        attributes: attributes,
        onStateChange: this.handleStateChange,
        onAuthEvent: this.handleAuthEvent,
        hide: hide
      });
    });

    const errorRenderer = this.props.errorRenderer || this.errorRenderer;
    const error = this.state.error;


    return (
      <div>
        {render_children}
        {error ? errorRenderer(error) : null}
      </div>
    )
  }
}

Authenticator.propTypes = {
  awsAuthRegion: PropTypes.string.isRequired,
  userPoolId: PropTypes.string.isRequired,
  clientAppId: PropTypes.string.isRequired,
};

export default withStyles(styles)(Authenticator);


class _AuthenticationContainer extends Component {
  render() {
    const {children, classes, background} = this.props;
    return (
      <div>
        <div className={classes.authenticatorContainer} style={background ? {background: background} : null}>
          <Paper className={classes.authenticationPaper}>
            {children}
          </Paper>
        </div>
      </div>
    )
  }
}

Authenticator.propTypes = {
  background: PropTypes.string,
};

export const AuthenticationContainer = withStyles(styles)(_AuthenticationContainer);


