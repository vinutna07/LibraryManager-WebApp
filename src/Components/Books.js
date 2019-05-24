import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import "./ReactTable.css"
import BookForm from './BookForm'
import EditIcon from '@material-ui/icons/Edit'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import { Link } from "react-router-dom";

class Books extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            formOpen: false,
            datarow: {},
            is_edit: false,
            showLoading:false
        }
    }

    getBooks = () =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/books`)
            .then(res => res.json())
    


    componentDidMount() {
        this.setState({ showLoading: true })
        this.getBooks()
            .then((row) => {
                this.setState({
                    data: row,
                })
                this.setState({ showLoading: false }) 
            })
               
    }

    editBookHandler = (property, info) => {
        let { book_id, title, author, total_num_of_books } = info.find((element) => element.book_id == property.row.book_id);
        this.setState({
            formOpen: true,
            datarow: {
                book_id, title, author, total_num_of_books
            },
            is_edit: true,
        });
    }

    handleForm = () => {
        this.setState({
            formOpen: true,
            is_edit: false,
        });
    }

    backToTable = () => {
        this.setState({ showLoading: true })
        this.getBooks()
            .then((row) => {
                this.setState({
                    data: row,
                    formOpen: false, 
                    is_edit: false,
                    datarow: {},
                    showLoading: false
                })
            })
    }

    render() {
        const IconStyle = {
            'font-size': '40px',
            'position': 'block',
            'color': 'rgb(194, 178, 143)',
            'margin': '20px auto',
        }

        return (
          <div>
            <Loading
              show={this.state.showLoading}
              color="#E86F68"
              showSpinner={false}
            />
            {this.state.formOpen ? (
              <BookForm
                onClick={this.backToTable}
                fill={this.state.datarow}
                is_edit={this.state.is_edit}
              />
            ) : (
              <div>
                <Link className="backArrow" to="/" />
                <h1>Books</h1>
                  <button onClick={this.handleForm}>Add Book</button>
                  <ReactTable
                    data={this.state.data}
                    columns={[
                      {
                        Header: "Book Code",
                        accessor: "book_id",
                        className: "sticky",
                        headerClassName: "sticky"
                      },
                      {
                        Header: "Title",
                        accessor: "title"
                      },
                      {
                        Header: "Author",
                        accessor: "author"
                      },
                      {
                        Header: "Date Added",
                        accessor: "date_added"
                      },
                      {
                        Header: "Total Books",
                        accessor: "total_num_of_books"
                      },
                      {
                        Header: "Currently Available",
                        accessor: "current_num_of_books"
                      },
                      {
                        Header: "Edit",
                        accessor: "author",
                        width: 200,
                        style: {
                          cursor: "pointer",
                          textAlign: "center"
                        },
                        Cell: pops => (
                          <div>
                            <EditIcon
                              onClick={() =>
                                this.editBookHandler(
                                  pops,
                                  this.state.data
                                )
                              }
                              color="black"
                              style={{ margin: 0 }}
                            />
                          </div>
                        )
                      }
                    ]}
                    defaultPageSize={10}
                  />
                </div>
            )}
            <br />
          </div>
        );
    }
}

export default Books;

