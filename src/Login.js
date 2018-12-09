import React, { Component } from 'react';
import { AuthContext } from './AuthProvider';
import {Switch, Route, Redirect} from 'react-router-dom'

import './css/login.css';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <AuthContext>

        {( {error,user, signIn}) => { // authContext

          if(user){

            return <Redirect to="/" />
          }

          const onSubmit = (event) => {
            event.preventDefault();

            let username = this.state.username;
            let password = this.state.password;
            console.log(username);
            console.log(password);
        
            if (username !== "" && password !== "") {
                signIn({username,password});

            }

          }

          return (
            <div className=" mainPanel container">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="input" className="form-control" id='username' name='username' placeholder="Enter Username" onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id='password' name='password' placeholder="Password" onChange={this.handleInputChange} />
                </div>
                <div className="form-check">
                  {/*<input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                </div>
                <button style={{width:'100%', background:'#e44d3a',border:'#e44d3a'}} type="submit" className="btn btn-primary">Login</button>
                <p style={{color:'red'}}>{error}</p>
              </form>
            </div>
          )
        }}

      </AuthContext>
    );
  }
}

export default Login;
