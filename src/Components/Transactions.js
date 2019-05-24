import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import "./ReactTable.css"
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

class Transactions extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            showLoading: false
        }
    }

    getTransactions = () => {
        return (
            fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/transactions`)
                .then(res => res.json())
        )
    }

    componentDidMount() {
        this.setState({ showLoading: true })
        this.getTransactions()
            .then((row) => {
                this.setState({
                    data: row,
                })
                this.setState({ showLoading: false })
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
            <ReactTable
              data={this.state.data}
              columns={[
                {
                  Header: "Transaction ID",
                  accessor: "transaction_id"
                },
                {
                  Header: "Book ID",
                  accessor: "book_id"
                },
                {
                  Header: "Reader ID",
                  accessor: "reader_id"
                },
                {
                  Header: "Issue Date",
                  accessor: "date_issued"
                },
                {
                  Header: "Due Date",
                  accessor: "date_due"
                },
                {
                  Header: "Return Date",
                  accessor: "date_returned"
                }
              ]}
              defaultPageSize={10}
            />
            <br />
          </div>
        );
    }
}

export default Transactions;

