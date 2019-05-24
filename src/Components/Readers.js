import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import "./ReactTable.css"
import ReaderForm from './ReaderForm'
import EditIcon from '@material-ui/icons/Edit'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

class Readers extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            formOpen: false,
            datarow: {},
            is_edit: false,
            showLoading: false
        }
    }

    getReaders = () => {

        return (
            fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/readers`)
                .then(res => res.json())
        )

    }

    componentDidMount() {
        this.setState({ showLoading: true })
        this.getReaders()
            .then((row) => {
                this.setState({
                    data: row,
                })
                this.setState({ showLoading: false })
            })
        
    }

    editReaderHandler = (property, info) => {
        let { reader_id, name, email, member_since } = info.find((element) => element.reader_id == property.row.reader_id);
        this.setState({
            formOpen: true,
            datarow: {
                reader_id, name, email, member_since
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
        this.getReaders()
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
      console.log(this.state.data)
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
              <ReaderForm
                onClick={this.backToTable}
                fill={this.state.datarow}
                is_edit={this.state.is_edit}
              />
            ) : (
              <div>
                <button onClick={this.handleForm}>Add Reader</button>
                <ReactTable
                  data={this.state.data}
                  columns={[
                    {
                      Header: "Reader Code",
                      accessor: "reader_id",
                      className: "sticky",
                      headerClassName: "sticky"
                    },
                    {
                      Header: "Name",
                      accessor: "name"
                    },
                    {
                      Header: "Email",
                      accessor: "email"
                    },
                    {
                      Header: "Total Checkouts",
                      accessor: "total_checkouts"
                    },
                    {
                      Header: "Current Checkouts",
                      accessor: "current_checkouts"
                    },
                    {
                      Header: "Member since",
                      accessor: "member_since"
                    },
                    {
                      Header: "Edit",
                      accessor: "email",
                      width: 200,
                      style: { cursor: "pointer", textAlign: "center" },
                      Cell: pops => (
                        <div>
                          <EditIcon
                            onClick={() =>
                              this.editReaderHandler(
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

export default Readers;

