import React, { Component } from 'react';
import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Components/Navbar';
import Info from '@material-ui/icons/Info';
import People from '@material-ui/icons/People';
import Book from '@material-ui/icons/Book';
import Books from './Components/Books';

class App extends Component {
  render() {
    const cardIconStyle = {
      'font-size': '40px',
      'position': 'block',
      'color': 'rgb(194, 178, 143)',
      'margin': '20px auto',
    }

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Switch>
          <Route exact path="/" render={() => (<div style = {{'height':'inherit'}}>
              <Navbar/>
              <div className='menu'>
                <div className='one' style={{ gridArea: 'one' }}>
                  <Link to= '/books'><div className='card'>
                    <div className='dot'>
                      <Info style={cardIconStyle} />
                    </div>
                    <h3>Info</h3>
                  </div></Link>
                </div>
                <div className='two' style={{ gridArea: 'two' }}>
                  <div className='card'>
                    <div className='dot'>
                      <h3>Members</h3>
                      <People style={cardIconStyle} />
                    </div>
                  </div>
                </div>
                <div className='three' style={{ gridArea: 'three' }}>
                  <div className='card'>
                    <div className='dot'>
                      <h3>Books</h3>
                      <Book style={cardIconStyle} />
                    </div>
                  </div>
                </div>
                <div className='four' style={{ gridArea: 'four' }}>
                  <div className='card'>
                    <div className='dot'>
                      <h3>Info</h3>
                      <Info style={cardIconStyle} />
                    </div>
                  </div>
                </div>
                <div className='five' style={{ gridArea: 'five' }}>
                  <div className='card'>
                    <div className='dot'>
                      <h2>Members</h2>
                      <People style={cardIconStyle} />
                    </div>
                  </div>
                </div>
                <div className='six' style={{ gridArea: 'six' }}>
                  <div className='card'>
                    <div className='dot'>
                      <h2>Books</h2>
                      <Book style={cardIconStyle} />
                    </div>
                  </div>
                </div>
                <div className='seven' style={{ gridArea: 'seven' }}>
                  <div className='card'>
                  </div>
                </div>
              </div>
            </div>)}/>
            <Route path="/books" render = {() => (
              <Books/>
            )}/>
            </Switch>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
