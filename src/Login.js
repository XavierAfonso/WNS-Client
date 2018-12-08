import React, { Component } from 'react';
import { AuthContext } from './AuthProvider';

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

        {(authContext) => {

          console.log(authContext);


          const onSubmit = (event) => {
            event.preventDefault();
            console.log(this.state.username);
            console.log(this.state.password);
        
            if (this.state.username !== "" && this.state.password !== "") {
            }

          }

          return (
            <div className="container">
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
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          )
        }}

      </AuthContext>
    );
  }
}

export default Login;
