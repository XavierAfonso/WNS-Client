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

            users:null,
            error:null,
            signIn:this.signIn,
            signUp:this.signUp,
            signOut:this.signOut,

          }
    }

    componentDidMount() {

        const token = window.localStorage.getItem('token');
        if(token){
            
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
            })*/
        }
    }

    signIn = ({username,password}) =>{

        console.log("SIGNIN");

        axios.post('/users/signin',{username,password}).then(response => {

            console.log(response);
            const {token} = response.data;
            window.localStorage.setItem('token',token);
            this.setState({user:"connected"});

            /*const {user,token} = response.data;
            console.log({user,token})
            window.localStorage.setItem('token',token);
            this.setState({user});*/

        }).catch(error => {
            console.error(error);
            this.setState({error: 'Invalid username or password'});
        });
    }

    signUp = ({username,password}) =>{

        console.log("SIGN UP");

       return axios.post('/users/signup',{username,password}).then(response => {
            
            //console.log("RESPONSE");
            console.log(response);

        }).catch(error => {
            console.error(error);
            this.setState({error: 'Invalid username or password'});
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