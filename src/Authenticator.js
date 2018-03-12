import React, {Component} from "react";
import {withStyles} from "material-ui/styles/index";
import SignIn from "./Components/SignIn"
import ForgotPassword from "./Components/ForgotPassword"
import RequireNewPassword from './Components/RequireNewPassword'
import {adjustRBGAlphaCss} from "./Utils";
import Paper from "material-ui/Paper/Paper";
import AmplifyMessageMap from 'aws-amplify-react/dist/AmplifyMessageMap';
import {Auth} from 'aws-amplify';

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
    background: `linear-gradient(
      240deg,
      ` + adjustRBGAlphaCss(theme.palette.primary.dark, .80) + `,
      ` + adjustRBGAlphaCss(theme.palette.primary.dark, .85) + `
    );
  `
  },
  authenticationPaper: {
    position: "absolute",
    flexDirection: "column",
    marginTop: "80px",
    width: "50%",
    maxWidth: "450px",
    minWidth: "400px",
  }
});

const defaultState = {
  errorColor: "#ff5722",
  authState: AUTH_STATES.signIn,
  authData: null,
  error: null
};

class Authenticator extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ...defaultState,
      errorColor: !!this.props.errorColor ? this.props.errorColor : defaultState.errorColor,
    };
    this.state = defaultState;
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

    this.setState({authState: state, authData: data, error: null});
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
    const {authState, authData, errorColor} = this.state;

    console.log("errorColor: ", errorColor);

    let {hideDefault, hide, federated} = this.props;
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
      <SignIn federated={federated} errorColor={errorColor}/>,
      <RequireNewPassword errorColor={errorColor}/>,
      <ForgotPassword errorColor={errorColor}/>
    ];

    const children = default_children.concat(props_children);
    const render_children = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        authState: authState,
        authData: authData,
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

export default withStyles(styles)(Authenticator);


class _AuthenticationContainer extends Component {

  render() {
    const {children, classes} = this.props;
    return (
      <div>
        <div className={classes.authenticatorContainer}>
          <Paper className={classes.authenticationPaper}>
            {children}
          </Paper>
        </div>
      </div>
    )
  }
}

export const AuthenticationContainer = withStyles(styles)(_AuthenticationContainer);


