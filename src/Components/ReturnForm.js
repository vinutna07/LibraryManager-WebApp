import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import SaveButton from './Buttons/SaveButton';

class ReturnForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            return_details: {
                reader_id: '',
                book_id: '',
            },
            showFormValidation: false,
            formErrorMessage: 'Cannot be blank',
            showLoading: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = (event) => {
        const { return_details } = this.state
        return_details[event.target.name] = event.target.value
        this.setState({ return_details })

    }

    returnBook = () =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/return`, {
            method: 'POST',
            headers: {
            },
            body: JSON.stringify(this.state.return_details)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                alert("Issue Succesful.")
            } else {
                alert("Issue failed. Try again.")
            }
        }).catch((error) => {
            console.log(error)
        })


    render() {
        const { return_details } = this.state;
        return (
            <div>
                <ValidatorForm
                    ref="form">

                    <TextValidator
                        label="Book ID"
                        placeholder="Book ID"
                        name="book_id"
                        value={return_details.book_id}
                        onChange={this.handleChange}
                        validators={['required']} />

                    <TextValidator
                        label="Reader ID"
                        placeholder="Reader ID"
                        name="reader_id"
                        value={return_details.reader_id}
                        onChange={this.handleChange}
                        validators={['required']} />
                    
                    <SaveButton onClick={this.returnBook} />
                    {this.state.showFormValidation && <p style={{ color: 'red' }}>{this.state.formErrorMessage} </p>}
                </ValidatorForm>
            </div>
        );
    }
}

export default ReturnForm;  