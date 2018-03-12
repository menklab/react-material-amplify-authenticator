import React from "react";
import PropTypes from "prop-types";
import {AuthPiece} from 'aws-amplify-react/dist/Auth';
import {withStyles} from "material-ui/styles";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button"
import {Auth} from 'aws-amplify';
import Paper from "material-ui/Paper/Paper";
import Zoom from 'material-ui/transitions/Zoom';
import ShakeButton from './ShakeButton/ShakeButton'
import {AUTH_STATES, AuthenticationContainer} from '../Authenticator'

const styles = theme => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
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
    color: this.props.errorColor,
    display: "inline"
  },
  bottomLinks: theme.mixins.gutters({
    display: "flex",
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    justifyContent: "space-between"
  }),
});

const FORGOT_PASSWORD_STATE = {
  request_code: "request_code",
  submit_reset: "submit_reset",
  success: "success"
};

const defaultState = {
  inputs: {},
  error: null,
  busy: false,
  shake: false,
  view: FORGOT_PASSWORD_STATE.request_code,
  delivery: {}
};

class ForgotPassword extends AuthPiece {

  constructor(props, context) {
    super(props, context);

    this.state = defaultState;

    this.validAuthStates = [AUTH_STATES.forgotPassword];

  }

  handleRequest = async e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      busy: true,
      shake: false,
      error: null
    });
    const {inputs} = this.state;
    const {username} = inputs;
    Auth.forgotPassword(username)
      .then((data) => {
        this.setState({
          delivery: data.CodeDeliveryDetails,
        });
        this.setState({
          busy: false,
          view: FORGOT_PASSWORD_STATE.submit_reset
        });
      })
      .catch(err => {
        this.setState({
          busy: false,
          shake: true,
          error: err
        });
        setTimeout(function () {
          this.setState({shake: false});
        }.bind(this), 1000);
      });
  };


  handleSubmit = async e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      busy: true,
      shake: false,
      error: null
    });
    const {inputs} = this.state;
    const {username, code, password} = inputs;
    Auth.forgotPasswordSubmit(username, code, password)
      .then(() => {
        this.setState(
          ...defaultState,
          {
            view: FORGOT_PASSWORD_STATE.success,
          });
      })
      .catch(err => {
        this.setState({
          busy: false,
          shake: true,
          error: err
        });
        setTimeout(function () {
          this.setState({shake: false});
        }.bind(this), 1000);
      });
  };

  validForm = () => {
    const {inputs, view} = this.state;

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

  handleChange = name => event => {
    event.persist();
    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: event.target.value
      }
    }));
  };

  successView = () => {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="title" className={classes.title}>Password Reset Successful</Typography>
        <Typography variant="body1" className={classes.subTitle}>Your password has been successfully reset. You can now proceed to log in.</Typography>
        <Button
          variant="raised"
          color="primary"
          className={classes.successButton}
          fullWidth
          onClick={(e) => {
            e.preventDefault();
            this.setState(defaultState);
            this.changeState(AUTH_STATES.signIn);
          }}
        >
          Log In
        </Button>
      </div>
    );
  };

  submitView = () => {
    const {classes} = this.props;
    const {inputs, error, shake, busy} = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="title" className={classes.title}>Password Reset</Typography>
        <Typography variant="body1" className={classes.subTitle}>Enter the reset code that was sent to you to finish
          resetting your password.</Typography>
        <form
          className={classes.formSubmit}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField
            id="username"
            label="Email / Phone"
            className={classes.textField}
            value={inputs.username || ''}
            onChange={this.handleChange("username")}
            margin="normal"
            autoFocus
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            autoFocus
            id="code"
            label="Reset Code"
            className={classes.textField}
            type="text"
            value={inputs.code || ''}
            onChange={this.handleChange("code")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            className={classes.textField}
            value={inputs.password || ''}
            onChange={this.handleChange("password")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <ShakeButton
            variant="raised"
            color="primary"
            className={classes.primaryButton}
            disabled={!this.validForm()}
            type="submit"
            fullWidth
            shake={shake}
            busy={busy}
          >
            Reset Password
          </ShakeButton>
          {!!error ?
            <Zoom direction="right" in={!!error} mountOnEnter unmountOnExit>
              <Paper className={classes.errorPaper} elevation={0}>
                <Typography variant="body2" className={classes.errorMessage}>{error.message}</Typography>
              </Paper>
            </Zoom>
            : null
          }
        </form>
      </div>
    );
  };

  requestView = () => {
    const {classes} = this.props;
    const {inputs, error, shake, busy} = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="title" className={classes.title}>Password Reset</Typography>
        <Typography variant="body1" className={classes.subTitle}>Enter the email or phone number attached to your
          account to receive a password reset code.</Typography>
        <form
          className={classes.formRequest}
          noValidate
          autoComplete="off"
          onSubmit={this.handleRequest}
        >
          <TextField
            id="username"
            label="Email / Phone"
            className={classes.textField}
            value={inputs.username || ''}
            onChange={this.handleChange("username")}
            margin="normal"
            autoFocus
            InputLabelProps={{
              shrink: true
            }}
          />
          <ShakeButton
            variant="raised"
            color="primary"
            className={classes.primaryButton}
            disabled={!this.validForm()}
            type="submit"
            fullWidth
            shake={shake}
            busy={busy}
          >
            Request Reset Code
          </ShakeButton>
          <Button
            variant="raised"
            color="primary"
            className={classes.secondaryButton}
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              this.setState({view: FORGOT_PASSWORD_STATE.submit_reset});
            }}
          >
            Already Have A Code
          </Button>
          {!!error ?
            <Zoom direction="right" in={!!error} mountOnEnter unmountOnExit>
              <Paper className={classes.errorPaper} elevation={0}>
                <Typography variant="body2" className={classes.errorMessage}>{error.message}</Typography>
              </Paper>
            </Zoom>
            : null
          }
        </form>
      </div>
    );
  };

  render() {
    const {view} = this.state;
    const {authState, hide, classes} = this.props;

    // if we are signed in then do not render
    if (hide && hide.includes(ForgotPassword)) {
      return null;
    }
    if (!this.validAuthStates.includes(authState)) {
      return null;
    }

    return (
      <AuthenticationContainer>
        {view === FORGOT_PASSWORD_STATE.request_code ? this.requestView() : null}
        {view === FORGOT_PASSWORD_STATE.submit_reset ? this.submitView() : null}
        {view === FORGOT_PASSWORD_STATE.success ? this.successView() : null}
        {view !== FORGOT_PASSWORD_STATE.success ?
          <div className={classes.bottomLinks}>
            <Typography variant="body1">
              <Button color="primary"
                 onClick={(e) => {
                   e.preventDefault();
                   this.setState(defaultState);
                   this.changeState(AUTH_STATES.signIn);
                 }}
              >&lt; Back To Login</Button>
            </Typography>
            {view === FORGOT_PASSWORD_STATE.submit_reset ?
              <Typography variant="body1">
                <Button color="primary"
                   onClick={(e) => {
                     e.preventDefault();
                     this.setState(defaultState);
                   }}
                >Request New Code</Button>
              </Typography>
              : null
            }
          </div>
          : null}
      </AuthenticationContainer>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  onStateChange: PropTypes.func.isRequired,
  errorColor: PropTypes.string.isRequired
};

export default withStyles(styles)(ForgotPassword);
