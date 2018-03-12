import React from "react";
import {withStyles} from "material-ui/styles";
import Button from "material-ui/Button";
import PropTypes from "prop-types";
import { CircularProgress } from 'material-ui/Progress';
import "./shakeButton.css";


const styles = theme => ({
  indicatorStyle: {
    color: theme.palette.primary.contrastText,
  }
});

class ShakeButton extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.state = {
      shake: false,
      busy: false
    };
  }

  render() {

    const {classes, children, busy, shake, ...other} = this.props;

    return (
      <Button
        {...other}
        className={(this.state.shake ? "btn-animate-shake " : "") + (this.props.className)}
      >
        { this.state.busy ?
          <CircularProgress className={classes.indicatorStyle} size={20} />
          :
          children
        }
      </Button>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      busy: nextProps.busy,
      shake: nextProps.shake
    });
  }
}

ShakeButton.propTypes = {
  classes: PropTypes.object.isRequired,
  shake: PropTypes.bool.isRequired,
  busy: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ShakeButton);
