import React from 'react';
import PropTypes from 'prop-types';
import {withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Post from '../Components/Post';
import { userService } from '../Utils/user.services';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNew from '@material-ui/icons/OpenInNew';


import ProfilCard from '../Components/ProfilCard';





//const { theme } = require('../Utils/theme');

const styles = theme => ({

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

  followers: {
    marginTop: '10px',
  },

  
  library: {
    marginTop: '10px',
  },

  following: {
    marginTop: '20px',
  },

  profil: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '500px',
    marginTop: '20px',
  },

  newPost: {

    marginTop: '10px',
    height: '100px',
    display: 'flex',
  },


  addBtn: {

    display: 'flex',
    marginLeft: 'auto',
    marginTop: '60px',
    marginRight: '15px',
    marginBottom: '15px',
  },
});


//const {data} = require('../Utils/data/dataProfilOther');
//const data = [];

class ProfilOther extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openEdit: false,
      currentEdit: null,
      data: [],
      mobileOpen: false,
      unsernameFollower : "",
      messageEmpty : "There are no books",
    }

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    // L'utilisateur en cours ne pas pas acceder à sa page ex /profil/username 
    // car ça page est à /profil
    const username = window.localStorage.getItem('username');
    this.setState({unsernameFollower : this.props.match.params.name});

    // console.log(unsenameFollower);
    if (this.props.match.params.name === username) {
      this.redirectToTarget(`/profil`)
    }
    else{

    userService.getUser(this.state.unsernameFollower).then(val => {
      console.log(val);

      userService.getBooksUser(  this.state.unsernameFollower).then(val => {

        //console.log("ici");
        //console.log(val.data);
        if(val.data.length> 0){
          this.setState({ data: val.data ,
                          messageEmpty : ""
          });
        }

      }).catch(err => {
        console.log(err);
        this.redirectToTarget(`/`)

      })

    }).catch(err => {
      console.error(err);
      this.redirectToTarget(`/`);
    }
    );
  }
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }

  render() {

    //console.log(this.props.match.params);

    const { classes } = this.props;

    const renderData = this.state.data.map((element) => {
      return (<Post key={element.id} data={element} />)
    });

    return (

     // <MuiThemeProvider theme={theme}>

        <div className={classes.root}>

          {/*<CssBaseline /> */}

          <div className={classes.appContent}>
            <Header home="false" onDrawerToggle={this.handleDrawerToggle} />
            <main className={classes.mainContent}>

              <Grid container spacing={24}>
                <Grid style={{ marginTop: '10px'}} item xs={12} lg={3}>

                  <ProfilCard me="false" username={this.props.match.params.name} />

                </Grid>

                <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={6}>

                <div style={{marginTop:"20px"}} >{this.state.messageEmpty} </div>
                  {renderData}

                </Grid>

                <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>

                <Card  className={classes.following}>
              <CardHeader
                action={
                  <IconButton

                    onClick={() => {
                      this.redirectToTarget(`/followings/${this.state.unsernameFollower}`);
                    }}>
                    <OpenInNew />
                  </IconButton>
                }

                title={
                  <Typography variant="h6" gutterBottom>
                    His Following
                  </Typography>
                }
              />
              </Card>

                  <Card className={classes.followers}>

                    <CardHeader
                      action={
                        <IconButton
                          onClick={() => {
                            this.redirectToTarget(`/followers/${this.state.unsernameFollower}`);
                          }}>
                          <OpenInNew />
                        </IconButton>
                      }

                      title={
                        <Typography variant="h6" gutterBottom>
                          His Followers
                          </Typography>
                      }
                    />


                  </Card>

                  <Card  className={classes.library}>
                <CardHeader
                  action={
                    <IconButton
                      onClick={() => {
                        this.redirectToTarget(`/librairy/${this.state.unsernameFollower}`);
                      }}>
                      <OpenInNew />
                    </IconButton>
                  }

                  title={
                    <Typography variant="h6" gutterBottom>
                      His Library
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

ProfilOther.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilOther);