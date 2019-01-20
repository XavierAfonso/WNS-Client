import React, { Component } from 'react';
import axios from 'axios';
import { userService } from '../Utils/user.services';

const { 
    Provider : AuthContextProvider, 
    Consumer : AuthContext,
 } = React.createContext();

class AuthProvider extends Component {
  
  constructor(props){
      super(props);

          this.state = {

            user:null,
            error:null,
            signIn:this.signIn,
            signUp:this.signUp,
            signOut:this.signOut,
            getAllUsers:this.getAllUsers,
            getUser:this.getUser,
            getFollowers:this.getFollowers,
            postFollower:this.postFollower,
            getBooksUser:this.getBooksUser,
          }
    }

    removeLocalStorage = () => {

        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        this.setState({user: null}); 
    }

    componentWillMount () {

       // if(this.state.user === null){

            const token = window.localStorage.getItem('token');
            const username = window.localStorage.getItem('username');
            this.setState({user: token}); 

              if(token){

                if(username){

                    console.log("DATUDA1");

                    userService.getMe().then(val => {

                        console.log("DATUDA2");
                        console.log(val);

                        if(val.data.email===username){
                            this.setState({user: username}); 
                        }
                        else{
                            this.removeLocalStorage();
                        }

                    }).catch(err => {
                        console.log("DATUDA3");
                        console.log(err);
                        this.removeLocalStorage();
                    });
                }
            }
           /* }
            else{

            }
          }*/

          /*if(this.state.user === null){

            const token = window.localStorage.getItem('token');

              if(token){
                this.setState({user: 'connected'});
                
              }
          }*/
    }

    getError = (error) => {

        if(error.response.status===400){
            this.setState({error: '400 The email already exist'});
        }
        else if(error.response.status===500){
            this.setState({error: '500 Server error'});
        }
        else if (error.response.status===403){
            this.setState({error: '403 forbidden'});
        }
        else{
            this.setState({error: 'Invalid username or password'});
        }
    }

    signIn = ({username,password}) =>{

        console.log("SIGNIN");
        this.setState({error : ""});

        return axios.post('/users/signin',{username,password}).then(response => {

            const {token} = response.data;
            window.localStorage.setItem('token',token);
            window.localStorage.setItem('username',username);

            this.setState({user: username});


        }).catch(error => {

            this.getError(error);
            throw error;
        });
    }

    signUp = (firstname,lastname,realUsername,username, password) =>{

       this.setState({error : ""});

       return axios.post('/users/signup',{firstname,lastname,realUsername,username, password}).then(response => {
            
        }).catch((error) => {
            
            this.getError(error);
            throw error;
           
        });
    }

    signOut = () => {
        console.log("LOGOUT")
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        this.setState({user : null})
    }


    getAllUsers = () => {

        const token = window.localStorage.getItem('token');

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token, 
        }

        //console.log(headers);

        return axios.get(`/users`,{headers}).then(response => {
            console.log("Users : ");
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    getUser = (id) => {

        const token = window.localStorage.getItem('token');

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token, 
        }

        return axios.get(`/users/${id}`,{headers}).then(response => {
            console.log("User : ");
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    getFollowers= (id) => {

        const token = window.localStorage.getItem('token');

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token, 
        }

        return axios.get(`/users/${id}/followers`,{headers}).then(response => {
            console.log("Followers : ");
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });

    }

    postFollower = (from, to) => {

        const token = window.localStorage.getItem('token');

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token, 
        }

        return axios.post(`/users/follow?from=${from}&to=${to}`,{},{headers}).then(response => {
            console.log("Followers : ");
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });


    }

    /*getFollowings = (id) => {

        const token = window.localStorage.getItem('token');

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token, 
        }

        return axios.get(`/users/${id}/followings`,{headers}).then(response => {
            console.log("Followings : ");
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });

    }*/
  
    render() {

        const { children } = this.props;
        return (
            <AuthContextProvider value={this.state}>
                {children}
            </AuthContextProvider>
        )
  }
}

export { AuthContext };
export default AuthProvider;
