import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import SaveButton from './Buttons/SaveButton';

class IssueForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issue_details: {
                reader_id: '',
                book_id: '',
                date_issued: '',
                date_due: '',
            },
            showFormValidation: false,
            formErrorMessage: 'Cannot be blank',
            showLoading: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.issueBook= this.issueBook.bind(this);
        this.bookAvailabilityCheck = this.bookAvailabilityCheck.bind(this);
        this.handleIssueBookBtn = this.handleIssueBookBtn.bind(this);
    }

    handleChange = (event) => {
        const { issue_details } = this.state
        issue_details[event.target.name] = event.target.value
        this.setState({ issue_details })
    }

    issueBook = (item) =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/issue`, {
            method: 'POST',
            headers: {
            },
            body: JSON.stringify(item)
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

    
    handleIssueBookBtn = () => {
        console.log("handle issue book btn")
        console.log(this.state.issue_details.book_id)
        let book_id = this.state.issue_details.book_id;
        this.bookAvailabilityCheck(book_id);
    }

    bookAvailabilityCheck = (book_id) =>  
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/books/` + book_id, {
            method: 'GET',
            headers: {
            },
        }).then(res =>{
            console.log(res)
            console.log(res.body)
            if(res.ok){
                this.issueBook(this.state.issue_details)
            }else{
                alert("Book Unavailable. Try again!")
            }
        }).catch((error) => {
            alert("Issue unsuccessful. Try again!")
            console.log(error)
        })
  
    render() {
        const { issue_details } = this.state;
        return (
            <div>
                <ValidatorForm
                    ref="form">

                    <TextValidator
                        label="Book ID"
                        placeholder="Book ID"
                        name="book_id"
                        value={issue_details.book_id}
                        onChange={this.handleChange}
                        validators={['required']} /> 

                    <TextValidator
                        label="Reader ID"
                        placeholder="Reader ID"
                        name="reader_id"
                        value={issue_details.reader_id}
                        onChange={this.handleChange}
                        validators={['required']} /> 

                    <TextValidator
                        label="Date Issued"
                        placeholder="Date"
                        name="date_issued"
                        value={this.state.issue_details.date_issued}
                        onChange={this.handleChange}
                        validators={'required'} />

                    <TextValidator
                        label="Date Due"
                        placeholder="Date+2weeks"
                        name="date_due"
                        value={this.state.issue_details.date_due}
                        onChange={this.handleChange}
                        validators={'required'} />

                    <SaveButton onClick={this.handleIssueBookBtn} />
                    {this.state.showFormValidation && <p style={{ color: 'red' }}>{this.state.formErrorMessage} </p>}
                </ValidatorForm>
            </div>
        );
    }
}

export default IssueForm;  