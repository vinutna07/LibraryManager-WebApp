import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar';
import Info from '@material-ui/icons/Info';
import People from '@material-ui/icons/People';
import TransactionIcon from '@material-ui/icons/CompareArrows';
import Book from '@material-ui/icons/Book';
import Books from './Books';
import Transactions from "./Transactions";
import Readers from './Readers';
import IssueForm from './IssueForm';
import ReturnForm from './ReturnForm';
import IssueIcon from '@material-ui/icons/ArrowUpward';
import ReturnIcon from '@material-ui/icons/ArrowDownward';
import StatisticsSection from './StatisticsSection';
import { SignOut } from "aws-amplify-react/dist/Auth";

export class HomePage extends Component {
         constructor(props, context) {
           super(props, context)
         }

         render() {
           const cardIconStyle = {
             "font-size": "40px",
             color: "rgb(194, 178, 143)",
             margin: "auto",
             transform: "translate(0, 40%)",
             width: "1em",
             display: "table-cell"
           };
           if(this.props.authState === "signedIn"){
           return (
             <MuiThemeProvider>
               <React.Fragment>
                 <Switch>
                   <Route
                     exact
                     path="/"
                     render={() => (
                       <div style={{ height: "inherit" }}>
                         <Navbar />
                         <div className="menu">
                           <div
                             className="one"
                             style={{ gridArea: "one" }}
                           >
                             <Link
                               to="/books"
                               style={{
                                 textDecoration: "none",
                                 color: "black",
                                 textAlign: "center"
                               }}
                             >
                               <div className="card">
                                 <div className="dot">
                                   <Book style={cardIconStyle} />
                                 </div>
                                 <h3>Books</h3>
                               </div>
                             </Link>
                           </div>
                           <div
                             className="two"
                             style={{ gridArea: "two" }}
                           >
                             <Link
                               to="/readers"
                               style={{
                                 textDecoration: "none",
                                 color: "black",
                                 textAlign: "center"
                               }}
                             >
                               <div className="card">
                                 <div className="dot">
                                   <People style={cardIconStyle} />
                                 </div>
                                 <h3>Readers</h3>
                               </div>
                             </Link>
                           </div>
                           <div
                             className="three"
                             style={{ gridArea: "three" }}
                           >
                             <Link
                               to="/transactions"
                               style={{
                                 textDecoration: "none",
                                 color: "black",
                                 textAlign: "center"
                               }}
                             >
                               <div className="card">
                                 <div className="dot">
                                   <TransactionIcon
                                     style={cardIconStyle}
                                   />
                                 </div>
                                 <h3>Transactions</h3>
                               </div>
                             </Link>
                           </div>
                           <div
                             className="four"
                             style={{ gridArea: "four" }}
                           >
                             <Link
                               to="/issuebook"
                               style={{
                                 textDecoration: "none",
                                 color: "black",
                                 textAlign: "center"
                               }}
                             >
                               <div className="ButtonCardI">
                                 <h3>
                                   <IssueIcon />
                                   Issue book
                                 </h3>
                               </div>
                             </Link>
                             <Link
                               to="/returnbook"
                               style={{
                                 textDecoration: "none",
                                 color: "black",
                                 textAlign: "center"
                               }}
                             >
                               <div className="ButtonCardR">
                                 <h3>
                                   <ReturnIcon />
                                   Return book
                                 </h3>
                               </div>
                             </Link>
                           </div>
                           <div
                             className="five"
                             style={{ gridArea: "five" }}
                           >
                             <Link
                               to="/info"
                               style={{
                                 textDecoration: "none",
                                 color: "black",
                                 textAlign: "center"
                               }}
                             >
                               <div className="card">
                                 <div className="dot">
                                   <Info style={cardIconStyle} />
                                 </div>
                                 <h3>Info</h3>
                               </div>
                             </Link>
                           </div>
                           <div
                             className="six"
                             style={{ gridArea: "six" }}
                           >
                             <Link
                               to="/librarians"
                               style={{
                                 textDecoration: "none",
                                 color: "black",
                                 textAlign: "center"
                               }}
                             >
                               <div className="card">
                                 <div className="dot">
                                   <People style={cardIconStyle} />
                                 </div>
                                 <h3>Librarians</h3>
                               </div>
                             </Link>
                           </div>
                           <div
                             className="seven"
                             style={{ gridArea: "seven" }}
                           >
                             <div className="card">
                               <h3>Statistics</h3>
                               <StatisticsSection/>
                             </div>
                             <Link
                               to="/librarians"
                               style={{
                                 textDecoration: "none",
                                 color: "black",
                                 textAlign: "center"
                               }}
                             >
                             </Link>
                           </div>
                         </div>
                       </div>
                     )}
                   />
                   <Route path="/books" render={() => <Books />} />
                   <Route
                     path="/readers"
                     render={() => <Readers />}
                   />
                   <Route
                     path="/issuebook"
                     render={() => <IssueForm />}
                   />
                   <Route
                     path="/returnbook"
                     render={() => <ReturnForm />}
                   />
                   <Route
                     path="/transactions"
                     render={() => <Transactions />}
                   />
                   <Route
                     path="/signin"
                     render={() => <SignOut />}
                   />
                 </Switch>
               </React.Fragment>
             </MuiThemeProvider>
           );
         }
         else{
           return null
         }}
       }

export default HomePage
