import React, { Component } from 'react';

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
            signOut:this.signOut,
          }
    }

    signIn = ({username,password}) =>{

    }

    signOut = () => {

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
