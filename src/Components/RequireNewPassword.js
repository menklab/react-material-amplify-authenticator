import React from "react";
import PropTypes from "prop-types";
import {AuthPiece} from 'aws-amplify-react/dist/Auth';
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {Auth} from 'aws-amplify';
import Paper from "@material-ui/core/Paper/Paper";
import Zoom from '@material-ui/core/Zoom';
import ShakeButton from './ShakeButton/ShakeButton'
import Button from '@material-ui/core/Button'
import {AUTH_STATES, AuthenticationContainer} from '../Authenticator'

const styles = theme => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
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
    marginBottom: theme.spacing.unit * 3,
  })
});

const defaultState = {
  inputs: {},
  error: null,
  busy: false,
  shake: false,
};

class RequireNewPassword extends AuthPiece {

  constructor(props, context) {
    super(props, context);

    this.state = defaultState;

    this.validAuthStates = [AUTH_STATES.requireNewPassword];

  }


  handleSubmit = async e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      busy: true,
      shake: false,
      error: null
    });
    const {inputs} = this.state;
    const user = this.props.authData;
    const {password} = inputs;
    const {requiredAttributes} = user.challengeParam;
    Auth.completeNewPassword(user, password, requiredAttributes)
      .then(() => {
        this.changeState('signedIn')
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
    const {inputs} = this.state;
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
    if (hide && hide.includes(RequireNewPassword)) {
      return null;
    }
    if (!this.validAuthStates.includes(authState)) {
      return null;
    }

    return (
      <AuthenticationContainer background={background}>
        <div className={classes.root}>
          <Typography variant="title" className={classes.title}>New Password Required</Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="password"
              label="Password"
              type="password"
              autoFocus
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
              Change Password
            </ShakeButton>
            {!!error ?
              <Zoom direction="right" in={!!error} mountOnEnter unmountOnExit>
                <Paper className={classes.errorPaper} elevation={0}>
                  <Typography variant="body2" className={classes.errorMessage} style={{"color": errorColor}}>{error.message}</Typography>
                </Paper>
              </Zoom>
              : null
            }
          </form>
        </div>
        <Typography className={classes.bottomLinks} variant="body1">
          <Button color="primary"
             onClick={(e) => {
               e.preventDefault();
               this.setState(defaultState);
               this.changeState(AUTH_STATES.signIn);
             }}
          >&lt; Back To Login</Button>
        </Typography>
      </AuthenticationContainer>
    );
  }
}

RequireNewPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  onStateChange: PropTypes.func.isRequired,
  errorColor: PropTypes.string.isRequired,
  background: PropTypes.string
};

export default withStyles(styles)(RequireNewPassword);
