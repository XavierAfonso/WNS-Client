import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Post from '../Components/Post';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../Utils/AuthProvider';

import { userService } from '../Utils/user.services';
import CircularProgress from '@material-ui/core/CircularProgress';

const drawerWidthFull = 400;
const drawerWidthMobile = 300;

// let imgUrl = 'wallpaper.png'

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidthFull,
      flexShrink: 0,
    },
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
    //backgroundImage: 'url(' + imgUrl + ')',
    //opacity: 0.5,
  },
  following: {
    // padding: theme.spacing.unit * 2,
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
    marginTop: '20px',
    // height: 'auto',
  },
  followers: {
    marginTop: '10px',
  },
  library: {
    marginTop: '10px',
  },
  avatar: {
    //margin: 10,
  },
  orangeAvatar: {
    //margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    //margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },

  progress: {
    margin: theme.spacing.unit * 2,
  },

});

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      filter: {},
      data: [],
      dataFiltred: [],
      isTourOpen: true,
      closeTour: false,
      cpt: 0,
      messageEmpty: "",
      displayCircularProgress : true,
    }
  }

  componentDidMount() {

    this.setState({ displayCircularProgress: true });
    const username = window.localStorage.getItem('username');

    userService.getWall(username).then(val => {

      if (val.data.length > 0) {

        this.setState({
          data: val.data,
          dataFiltred: val.data,
          messageEmpty: ""
        });

       
        // console.log("ici");
        console.log(val.data);
      }
      else{
        
        this.setState({ messageEmpty: "The wall is empty." });
      }
      this.setState({ displayCircularProgress: false });

    }).catch(err => {
      console.log(err);
      this.setState({ messageEmpty: "The wall is empty." });
      this.setState({ displayCircularProgress: false });
    });


  };


  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };


  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }

  changeValue = (newvalue) => {

    if (newvalue.length === 0) {
      this.setState({ dataFiltred: this.state.data });

      if(this.state.data.length === 0){
        this.setState({ messageEmpty: "The wall is empty." });
      }
    }
    else {
      this.setState({
        dataFiltred: newvalue,
        messageEmpty: ""
      });
    }

    console.log(newvalue);
  }

  render() {

    return (
      <AuthContext>
        {({ }) => {

          let email = "admin@gmail.com";
          let to = "test@gmail.com";

          const { classes } = this.props;

          const renderData = this.state.dataFiltred.map((element) => {
            return (<Post key={element.id} data={element} />)
          });

          return (

            //<MuiThemeProvider theme={theme}>


            <div className={classes.root}>
              <CssBaseline />
              <nav className={classes.drawer}>

                <Hidden smUp implementation="js">

                  <Navigator
                    PaperProps={{ style: { width: drawerWidthMobile } }}
                    variant="temporary"
                    open={this.state.mobileOpen}
                    onClose={this.handleDrawerToggle}
                    changeValue={this.changeValue}
                  />

                </Hidden>

                <Hidden xsDown implementation="js">
                  <Navigator
                    changeValue={this.changeValue}
                    PaperProps={{ style: { width: drawerWidthFull } }}
                  />
                </Hidden>

              </nav>
              <div className={classes.appContent}>
                <Header home="true" onDrawerToggle={this.handleDrawerToggle} />

                <main className={classes.mainContent}>

                  <Grid container spacing={24}>

                  <Grid style={{marginTop: "10px"}} data-tut=".3-home-step" item xs={12} md={8}>
                    
                  <Grid container justify="center" alignItems="center">
                  {this.state.displayCircularProgress === true &&
                  <CircularProgress className={classes.progress}/>}
                  {this.state.messageEmpty} 
                  </Grid>
                  
                  {renderData}


                    </Grid>

                    <Grid item xs={12} md={4}>

                      <Card data-tut=".9-home-step" className={classes.following}>

                        <CardHeader
                          action={
                            <IconButton
                              onClick={() => {
                                this.redirectToTarget(`/followings`);
                              }}>
                              <OpenInNew />
                            </IconButton>
                          }

                          title={
                            <Typography variant="h6" gutterBottom>
                              Following
                              </Typography>
                          }
                        />


                      </Card>

                      <Card data-tut=".10-home-step" className={classes.followers}>

                        <CardHeader
                          action={
                            <IconButton
                              onClick={() => {
                                this.redirectToTarget(`/followers`);
                              }}>
                              <OpenInNew />
                            </IconButton>
                          }

                          title={
                            <Typography variant="h6" gutterBottom>
                              Followers
                          </Typography>
                          }
                        />
                      </Card>


                      <Card data-tut=".13-home-step" className={classes.library}>

                        <CardHeader
                          action={
                            <IconButton
                              onClick={() => {
                                this.redirectToTarget(`/librairy`);
                              }}>
                              <OpenInNew />
                            </IconButton>
                          }

                          title={
                            <Typography variant="h6" gutterBottom>
                              Library
                              </Typography>
                          }
                        />
                      </Card>

                    </Grid>
                  </Grid>
                </main>
              </div>
            </div>
            // </MuiThemeProvider>
          );
        }
        }
      </AuthContext>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);