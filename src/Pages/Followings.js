import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import FollowingCard from '../Components/FollowingCard';

import { userService } from '../Utils/user.services';


const {theme} = require('../Utils/theme');

const styles  = theme => ({
  
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '60px 36px 0',
    background: '#eaeff1',
  },
});


//const {data} = require('../Utils/data/dataFollowings');




class Followings extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data : [],
      mobileOpen: false,
      messageEmpty : "There are no followings",
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = (page) => {
    console.log(this.beforeNavigate);
    this.context.router.history.push(`${page}`)
  }

  getFollowings = (username) => {

    userService.getFollowings(username).then(val => {

      if(val.data.length > 0){
        this.setState({data : val.data,
                        messageEmpty : ""});
        console.log(val.data);
        }
     
    }).catch(err => console.log(err));
  }

  componentDidMount(){

    console.log("test");

    let username = "";

    // console.log("ici" + this.props.match.params.name)

    if(this.props.match.params.name){
      username = this.props.match.params.name;

      userService.getUser(username).then(val => {
        this.getFollowings(username);

      }).catch(err => {
        console.log(err);
        this.redirectToTarget(`/`);
      })
    }

    else{
       username = window.localStorage.getItem('username');
       this.getFollowings(username);
    }
  }
  
  render() {
    const { classes } = this.props;


    const renderData = this.state.data.map((element,i) => {
      return (
      
      <Grid  key={i} style={{ backgroundColor: 'transparent' }} item xs={6} md={3}>
        <FollowingCard key={i}  username = {element.email}  />
      </Grid>
      
     )
     });


    return (

      <MuiThemeProvider theme={theme}>
      
        <div className={classes.root}>
          

          <div className={classes.appContent}>
            <Header home = "false" onDrawerToggle={this.handleDrawerToggle} />
              <main className={classes.mainContent}>

          <Grid container spacing={24}>

          {this.state.messageEmpty}
          {renderData}

        </Grid>
                
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Followings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Followings);