import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from './Home';
import LoginPage from './Login';
import RegisterPage from './Register';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ component: Component, ...rest }) => {

  return <Route {...rest} render={(params) => {
      
      return <AuthContext>

         {( {user}) => {

          return user 
          ? <Component {...params} />
          : <Redirect to="/login" />
         }}

      </AuthContext>
    }} />
}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {

    return (
      <Switch>
        <ProtectedRoute path="/" exact component={HomePage} />
        {/*<Route path="/" exact component={HomePage} />*/}
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/*" component={LoginPage} />
      </Switch>
    );
  }
}

export default App;
