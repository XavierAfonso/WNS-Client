import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'

import HomePage from './Home';
import LoginPage from './Login';
import { AuthContext } from './AuthProvider';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    );
  }
}

export default App;
