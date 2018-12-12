import React, { Component } from 'react';
import { AuthContext } from './AuthProvider';
import {Switch, Route, Redirect} from 'react-router-dom'

import './css/login.css';

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {

      username: "",
      password: "",

      statusRegister: null,

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

        {( {error,user, signUp}) => { // authContext

          if(user){

            return <Redirect to="/" />
            
          }

          const onSubmit = (event) => {

            event.preventDefault();
            console.log("LOG 1");

            let username = this.state.username;
            let password = this.state.password;
            console.log(username);
            console.log(password);
        
            if (username !== "" && password !== "") {

                 return signUp({username,password}).then(() => {
                  this.setState({statusRegister:"Account has been successfully registered"})
                });
            }
          }

          return (
            <div className=" mainPanel container">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input type="email" className="form-control" id='username' name='username' placeholder="Enter Username" onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id='password' name='password' placeholder="Password" onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" className="form-control" id='confirmPassword' name='confirmPassword' placeholder="Confirm Password" onChange={this.handleInputChange} />
                </div>
                <div className="form-check">
                  {/*<input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                </div>
                <button style={{width:'100%', background:'#e44d3a',border:'#e44d3a'}} type="submit" className="btn btn-primary">Register</button>
                <p style={{color:'red'}}>{error}</p>
                <p style={{color:'green'}}>{this.state.statusRegister}</p>
                <a href="/login">You already have an account ?</a>
              </form>
            </div>
          )
        }}

      </AuthContext>
    );
  }
}

export default Register;
