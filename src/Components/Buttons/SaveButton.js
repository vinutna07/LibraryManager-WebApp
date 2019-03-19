import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

const styles = theme => ({
     savebutton:{
        margin: theme.spacing.unit,
        float: 'right',
      }
  });
  
class SaveButton extends Component {
    render() {
    const { classes } = this.props;

    return (
        <Button
        className={classes.savebutton}
        size="small"
        variant="contained"                                
        color="default"
        type="submit"
        onClick ={this.props.onClick}
        >Save</Button> 
    );
  }
}

SaveButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SaveButton);
