import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import { AuthContext } from './Utils/AuthProvider';
import HomePage from './Pages/Home';
import ProfilPage from './Pages/Profil';
import ProfilOther from './Pages/ProfilOther';

import LibrairyPage from './Pages/Librairy';


import './css/general.css';


const ProtectedRoute = ({ component: Component, ...rest }) => {

  return <Route {...rest} render={(params) => {
      
      return <AuthContext>

         {( {user}) => {

          //console.log("SECOND");

            if(user === null){

              const token = window.localStorage.getItem('token');

                if(token){
                  user = "connected";
                }
            }

           //console.log("THE USER " + user);

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
        <ProtectedRoute path="/profil/:name" component={ProfilOther} />
        <ProtectedRoute path="/profil" component={ProfilPage} />
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute path="/librairy" component={LibrairyPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/*" component={LoginPage} />
      </Switch>
    );
  }
}

export default App;
