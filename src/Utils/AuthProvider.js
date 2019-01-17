import React, { Component } from 'react';
import axios from 'axios';

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
            //getFollowings:this.getFollowing,

          }
    }

    componentWillMount () {

        if(this.state.user === null){

            const token = window.localStorage.getItem('token');

              if(token){
                this.setState({user: 'connected'});
                
              }
          }

         //console.log("THE USER " + user);

        // console.log(this.state.user );

        /*const token = window.localStorage.getItem('token');
        if(token){
            
            console.log("FIRST");
            
            this.setState({user : "connected"});
           
            /*axios.get('/api/me', {
                headers : {
                    Authorization : `bearer ${token}`,
                }

            }).then(response => {
                const { user } = response.data;
                this.setState({user});
            }).catch(err => {
                console.error(err);
                window.localStorage.removeItem('token');
            })
        }*/
    }

    getError = (error) => {

        //console.log("ici " + error.response.status);

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

        axios.post('/users/signin',{username,password}).then(response => {

            console.log(response);
            const {token} = response.data;
            window.localStorage.setItem('token',token);

            console.log("ICIIIII");



            this.setState({user: username});
            

            /*const {user,token} = response.data;
            console.log({user,token})
            window.localStorage.setItem('token',token);
            this.setState({user});*/

        }).catch(error => {

            this.getError(error);
           // throw error;
        });
    }

    signUp = (username,password) =>{

       this.setState({error : ""});

       return axios.post('/users/signup',{username,password}).then(response => {
            
        }).catch((error) => {
            
            this.getError(error);
            throw error;
           
        });
    }

    signOut = () => {
        console.log("LOGOUT")
        window.localStorage.removeItem('token');
        this.setState({user : null})
        //window.location.reload();
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
