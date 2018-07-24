import React from "react";
import PropTypes from "prop-types";
import {AuthPiece} from 'aws-amplify-react/dist/Auth';
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {Auth, JS} from 'aws-amplify';
import Paper from "@material-ui/core/Paper/Paper";
import Zoom from '@material-ui/core/Zoom';
import ShakeButton from './ShakeButton/ShakeButton'
import Button from '@material-ui/core/Button'
import {AUTH_STATES, AuthenticationContainer} from '../Authenticator'

const styles = theme => ({
  wrapper: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
  }),
  textField: {
    width: "100%"
  },
  form: {
    marginTop: theme.spacing.unit * 3,
    height: "250px"
  },
  primaryButton: {
    marginTop: theme.spacing.unit * 3,
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
    marginBottom: theme.spacing.unit * 3,
  })
});

const defaultState = {
  inputs: {},
  error: null,
  busy: false,
  shake: false
};

class SignIn extends AuthPiece {

  constructor(props, context) {
    super(props, context);

    this.state = defaultState;

    this.validAuthStates = [AUTH_STATES.signIn, AUTH_STATES.signedOut];

  }

  checkContact = (user) => {
    this.changeState(AUTH_STATES.signedIn, user);
    Auth.verifiedContact(user)

      .then(data => {
        if (!JS.isEmpty(data.verified)) {
          // this.changeState('signedIn');
          this.changeState(AUTH_STATES.signedIn, user);
        } else {
          user = Object.assign(user, data);
          this.changeState(AUTH_STATES.verifyContact, user);
        }
      })
      .catch(err => {
        this.handleStateChange(AUTH_STATES.signIn);
      });
  }

  handleSubmit = e => {
    e.stopPropagation();
    e.preventDefault();

    let cls = this.props.clearLocalStorage;
    if (!!cls) {
      for (let i = 0; i < cls.length; i++) {
        window.localStorage.removeItem(cls[i]);
      }
    }

    this.setState({
      busy: true,
      shake: false,
      error: null
    });
    const {inputs} = this.state;
    Auth.signIn(inputs.username, inputs.password)
      .then(user => {
        this.setState({
          ...defaultState,
          inputs: {
            ...defaultState.inputs,
            username: inputs.username
          }
        });
        if (user.challengeName === 'SMS_MFA') {
          this.changeState(AUTH_STATES.confirmSignIn, user);
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.changeState(AUTH_STATES.requireNewPassword, user);
        } else {
          this.checkContact(user);
        }
      })
      .catch(err => {
        this.setState({
          ...defaultState,
          shake: true,
          error: err,
          inputs: {
            ...defaultState.inputs,
            username: inputs.username
          }
        });
        setTimeout(function () {
          this.setState({shake: false});
        }.bind(this), 1000);
      });
  };

  validForm = () => {
    const {inputs} = this.state;
    if (inputs.username == null || inputs.username === "") return false;
    if (inputs.password == null || inputs.password === "") return false;

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

  render() {
    const {inputs, error, shake, busy} = this.state;
    const {classes, authState, hide, errorColor, background} = this.props;

    // if we are signed in then do not render
    if (hide && hide.includes(SignIn)) {
      return null;
    }
    if (!this.validAuthStates.includes(authState)) {
      return null;
    }
    return (
      <AuthenticationContainer background={background}>
        <div className={classes.wrapper}>
          <Typography variant="title" className={classes.title}>Log In To Your Account</Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >

            <TextField
              autoFocus
              id="username"
              label="Email / Phone"
              className={classes.textField}
              type="text"
              value={inputs.username || ''}
              onChange={this.handleChange("username")}
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
              Sign In
            </ShakeButton>
            {!!error ?
              <Zoom direction="right" in={!!error} mountOnEnter unmountOnExit>
                <Paper className={classes.errorPaper} elevation={0}>
                  <Typography variant="body2" className={classes.errorMessage}
                              style={{"color": errorColor}}>{error.message}</Typography>
                </Paper>
              </Zoom>
              : null
            }
          </form>
        </div>
        <Typography className={classes.bottomLinks} variant="body1">
          <Button
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              this.changeState(AUTH_STATES.forgotPassword);
            }}
          >Forgot Password</Button>
        </Typography>
      </AuthenticationContainer>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  onStateChange: PropTypes.func.isRequired,
  errorColor: PropTypes.string.isRequired,
  background: PropTypes.string
};

export default withStyles(styles)(SignIn);
