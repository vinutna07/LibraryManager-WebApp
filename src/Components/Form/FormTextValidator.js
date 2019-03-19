import React, { Component } from 'react';
import {TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis: 200,
      width: 300,
    },
    button:{
      margin: theme.spacing.unit,
    }
  });
    
class FormTextValidator extends Component{
    render(){
        const {classes} = this.props;
    return(
        <TextValidator
          className={classNames(classes.margin, classes.textField)}
          label={this.props.label}
          id="margin-normal"
          placeholder={this.props.placeholder}
          type="text" 
          name={this.props.name} 
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          onChange= {this.props.onChange}
          validators={[this.props.validators]}
          errorMessages={['this field is required']} 
        />
    );}
}
 

FormTextValidator.propTypes = {
    classes: PropTypes.object.isRequired,
    };
                  
export default withStyles(styles)(FormTextValidator);