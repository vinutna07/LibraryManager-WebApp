import React, { Component } from 'react';
import './App.css';
import HomePage from './Components/HomePage'
import {SignIn, SignOut, Greetings} from 'aws-amplify-react'
import config from './aws-exports'
import { Authenticator } from 'aws-amplify-react/dist/Auth'
import SignInPage from './Components/SignInPage'
class App extends Component {
  render() {
    return (
      <div>
        <Authenticator
          hide={[SignIn, SignOut, Greetings]}
          amplifyConfig={config}
        >
          <SignInPage />
          <HomePage />
        </Authenticator>
      </div>
    );
  }
}

export default App;
