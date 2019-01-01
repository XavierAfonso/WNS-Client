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

          }
    }

    componentDidMount() {

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

        axios.post('/users/signin',{username,password}).then(response => {

            console.log(response);
            const {token} = response.data;
            window.localStorage.setItem('token',token);

            console.log("ICIIIII");



            this.setState({user: username});
            this.setState({error: ''});

            /*const {user,token} = response.data;
            console.log({user,token})
            window.localStorage.setItem('token',token);
            this.setState({user});*/

        }).catch(error => {

            this.getError(error);
           // throw error;
        });
    }

    signUp = ({username,password}) =>{

    
       return axios.post('/users/signup',{username,password}).then(response => {
            
        }).catch((error) => {
            
            this.getError(error);
            //throw error;
           
        });
    }


    signOut = () => {
        console.log("LOGOUT")
        window.localStorage.removeItem('token');
        this.setState({user : null})
        //window.location.reload();
    }
  
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
