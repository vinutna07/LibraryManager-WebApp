import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    root: {
    padding: '0px 15px 15px 15px', 
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    button:{ 
        margin: theme.spacing.unit,    
        position :'absolute',
        top : '11px',
        right:'25px',
        float: 'right',
        type: 'submit',
      },
     savebutton:{
        margin: theme.spacing.unit,
        float: 'right',
      }
  });
  

  class Form extends Component {
      render() {
      const { classes } = this.props;
  
      return (
        <div >
          <Dialog disableBackdropClick disableEscapeKeyDown
            open={this.props.open}
            onClose={this.props.onClose}>
          <DialogTitle>{this.props.formTitle}</DialogTitle>
          <Button onClick={this.props.onClose} className={classes.button} size="small"
                  variant="contained"                                
                  color="default"
                  type="submit">Cancel</Button>
          <DialogContent style ={{width:'350px',padding:'10px',paddingTop:'0px'}}>
          <div className={classes.root}>
           {this.props.children} 
          </div>            
          </DialogContent>
          </Dialog>
        </div>
      );
    }
  }
  
Form.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Form);
  