import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import SaveButton from './Buttons/SaveButton';

class ReaderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reader_details: {
                reader_id: '',
                name: '',
                email: '',
                member_since: '',
            },
            showFormValidation: false,
            formErrorMessage: 'Cannot be blank',
            open: false,
            is_edit: false,
            showLoading: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        const { reader_id, name, email, member_since } = this.props.fill;
        const edit = this.props.is_edit
        this.setState({
            reader_details: { reader_id, name, email, member_since },
            is_edit: edit,
        })
    }

    handleChange = (event) => {
        const { reader_details } = this.state

        reader_details[event.target.name] = event.target.value
        this.setState({ reader_details })

    }

    addReader = (item) =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/readers`, {
            method: 'POST',
            headers: {
            },
            body: JSON.stringify(item)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                this.props.onClick()
            } else {
                alert("Reader with the same ID exists. Try Again.")
            }

        })
            .catch((error) => {
                console.log(error)
            })

    updateReader = (item) =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/readers/update`, {
            method: 'POST',
            headers: {
            },
            body: JSON.stringify(item)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                this.props.onClick()
            } else {
                alert("Reader with the same ID exists. Try Again.")
            }

        })
            .catch((error) => {

                console.log(error)
            })

    deleteReader = (item) =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/readers/` + item, {
            method: 'DELETE',
            headers: {
            },
            body: JSON.stringify(item)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                this.props.onClick()
            } else {
                alert("Delete unsuccessful. Try again!")
            }

        })
            .catch((error) => {
                alert("Delete unsuccessful. Try again!")
                console.log(error)
            })

    handleSaveReaderDetailsBtn = () => {
        this.state.is_edit ? this.updateReader(this.state.reader_details) :
            this.addReader(this.state.reader_details)

    }


    deleteReaderHandler = () => {
        if (window.confirm("Do you want to delete this reader?")) {
            this.deleteReader(this.state.reader_details.reader_id)
        }

    }

    render() {
        const { reader_details } = this.state;
        return (
            <div>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleAddReaderBtn}>
                    {!this.state.is_edit ? <TextValidator
                        label="Reader ID"
                        placeholder="Reader ID"
                        name="reader_id"
                        value={reader_details.reader_id}
                        onChange={this.handleChange}
                        validators={['required']} /> : <h2>Edit Reader [ID: {this.state.reader_details.reader_id}]</h2>}

                    <TextValidator
                        label="Name"
                        placeholder="Name"
                        name="name"
                        value={this.state.reader_details.name}
                        onChange={this.handleChange}
                        validators={'required'} />

                    <TextValidator
                        label="Email ID"
                        placeholder="abc@xyz.com"
                        name="email"
                        value={this.state.reader_details.email}
                        onChange={this.handleChange}
                        validators={'required'} />

                    <TextValidator
                        label="Member Since"
                        placeholder="yyyy-mm-dd"
                        name="member_since"
                        value={this.state.reader_details.member_since}
                        onChange={this.handleChange}
                        validators={'required'} />
                    <SaveButton onClick={this.handleSaveReaderDetailsBtn} />
                    <button
                        onClick={this.props.onClick}
                    >close</button>
                    <button
                        onClick={this.deleteReaderHandler}
                    >delete</button>
                    {this.state.showFormValidation && <p style={{ color: 'red' }}>{this.state.formErrorMessage} </p>}
                </ValidatorForm>
            </div>
        );
    }
}

export default ReaderForm;  