import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import SaveButton from './Buttons/SaveButton';
import { Link } from 'react-router-dom';

class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book_details: {
                book_id: '',
                title: '',
                author: '',
                total_num_of_books: '',
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
        const { book_id, title, author, total_num_of_books } = this.props.fill;
        const edit = this.props.is_edit
        this.setState({
            book_details: { book_id, title, author, total_num_of_books },
            is_edit: edit,
        })
    }

    handleChange = (event) => {
        const { book_details } = this.state
        book_details[event.target.name] = event.target.value
        this.setState({ book_details })
    }

    addBook = (item) =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/books`, {
            method: 'POST',
            headers: {
            },
            body: JSON.stringify(item)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                this.props.onClick()
            } else {
                alert("Book with the same ID exists. Try Again.")
            }
        }).catch((error) => {
                console.log(error)
        })

    updateBook = (item) =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/books/update`, {
            method: 'POST',
            headers: {
            },
            body: JSON.stringify(item)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                this.props.onClick()
            } else {
                alert("Book with the same ID exists. Try Again.")
            }
        }).catch((error) => {

                console.log(error)
        })

    deleteBook = (item) =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/books/` + item, {
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
        }).catch((error) => {
            alert("Delete unsuccessful. Try again!")
            console.log(error)
        })

    handleSaveBookDetailsBtn = () => {
        this.state.is_edit ? this.updateBook(this.state.book_details) :
            this.addBook(this.state.book_details)
    }


    deleteBookHandler = () => {
        if(window.confirm("Do you want to delete this book?")){
            this.deleteBook(this.state.book_details.book_id)
        }
    }

    render() {
    const fieldStyle = {
        'margin': '20px 0px',
        'display': 'block'
    }

    const { book_details } = this.state;
    return (
        <div>
        <div className= "formPaper">
            {!this.state.is_edit ? <h2>Add New Book</h2> : <p></p>}
            <ValidatorForm ref="form" >
                {!this.state.is_edit ?
                        <TextValidator
                        style = {fieldStyle}
                        label="Book Code"
                        placeholder="ISBN"
                        name="book_id"
                        value={book_details.book_id}
                        onChange={this.handleChange}
                        validators={['required']} /> : <h2>Edit Book [ID: {this.state.book_details.book_id}]</h2>}

                    <TextValidator
                        style={fieldStyle}
                        label="Title"
                        placeholder="Title"
                        name="title"
                        value={this.state.book_details.title}
                        onChange={this.handleChange}
                        validators={'required'} />

                    <TextValidator
                    style={fieldStyle}
                        label="Author"
                        placeholder="Author"
                        name="author"
                        value={this.state.book_details.author}
                        onChange={this.handleChange}
                        validators={'required'} />

                    <TextValidator
                    style={fieldStyle}
                        label="Total Books"
                        placeholder="Number of Books"
                        name="total_num_of_books"
                        value={this.state.book_details.total_num_of_books}
                        onChange={this.handleChange}
                        validators={'required'} />
                    <SaveButton onClick={this.handleSaveBookDetailsBtn} />
                    <button
                        onClick={this.props.onClick}
                    >close</button>
                    <button
                        onClick={this.deleteBookHandler}
                    >delete</button>
                    {this.state.showFormValidation && <p style={{ color: 'red' }}>{this.state.formErrorMessage} </p>}
                </ValidatorForm>
            </div>
        </div>
        );
    }
}

export default BookForm; 