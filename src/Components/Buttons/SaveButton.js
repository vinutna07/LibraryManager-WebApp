import Button from '@material-ui/core/Button';
import React, { Component } from 'react';

class SaveButton extends Component {
    render() {
    
    return (
        <Button
        size="small"
        variant="contained"                                
        color="default"
        type="submit"
        onClick ={this.props.onClick}
        >Save</Button> 
    );
  }
}

export default SaveButton;
