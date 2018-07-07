import React from "react";
import {Auth} from 'aws-amplify';
import {AuthPiece} from 'aws-amplify-react/dist/Auth';
import Button from '@material-ui/core/Button/Button'
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {AUTH_STATES} from "../Authenticator";


const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class SignOutButton extends AuthPiece {

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      message: ""
    };
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false});
  };

  handleSignOut = () => {
    Auth.signOut()
      .then(() => {
        this.changeState(AUTH_STATES.signedOut);
      })
      .catch(err => {
        this.setState({
          open: true,
          message: err.message
        });

      });

  };

  render() {

    const {children, classes, color} = this.props;


    return (
      <div>
        <Button style={{"color": color}} onClick={this.handleSignOut}>{children}</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <Button key="undo" className={classes.close} size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon/>
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SignOutButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  color: PropTypes.string,
};

export default withStyles(styles)(SignOutButton);
