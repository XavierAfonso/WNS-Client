import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';
import Header from './Header';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Post from '../Components/Post';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Typography from '@material-ui/core/Typography';

const { theme } = require('../Utils/theme');

const { data } = require('../Utils/data/dataHome');

const drawerWidthFull = 400;
const drawerWidthMobile = 200;

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
  },
  following: {
    // padding: theme.spacing.unit * 2,
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
    marginTop: '10px',
    // height: 'auto',
  },
  followers: {

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

});

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }

  render() {
    const { classes } = this.props;

    const renderData = data.map((element) => {
      return (<Post key={element.id} data={element} />)
    });

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">

              <Navigator
                PaperProps={{ style: { width: drawerWidthMobile } }}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidthFull } }} />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <Header home="true" onDrawerToggle={this.handleDrawerToggle} />

            <main className={classes.mainContent}>

              <Grid container spacing={24}>
                
                <Grid item xs={12} lg={8}>

                  {renderData}

                </Grid>
                
                <Grid item xs={12} lg={4}>

                  <Card className={classes.following}>

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

                    <CardContent >
                      <Grid container justify="center" alignItems="center">
                        <IconButton>
                          <Avatar className={classes.avatar}>H</Avatar>
                        </IconButton>
                        <IconButton>
                          <Avatar className={classes.orangeAvatar}>N</Avatar>
                        </IconButton>

                        <IconButton>
                          <Avatar className={classes.purpleAvatar}>OP</Avatar>
                        </IconButton>
                      </Grid>
                    </CardContent>
                </Card>


                <Card className={classes.followers}>

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

                    <CardContent >

                    <Grid container justify="center" alignItems="center">
              <IconButton>  <Avatar className={classes.avatar}>P</Avatar></IconButton>
              
                <IconButton><Avatar className={classes.orangeAvatar}>W</Avatar></IconButton>
                
                <IconButton>  <Avatar className={classes.purpleAvatar}>IL</Avatar></IconButton>
              
                <IconButton><Avatar className={classes.avatar}>H</Avatar></IconButton>
                           
                
              </Grid>

                    </CardContent>
                  </Card>


                  {/*<Paper className={classes.paper}>
              Followers
              <Grid container justify="center" alignItems="center">
              <IconButton>  <Avatar className={classes.avatar}>P</Avatar></IconButton>
              
                <IconButton><Avatar className={classes.orangeAvatar}>W</Avatar></IconButton>
                
                <IconButton>  <Avatar className={classes.purpleAvatar}>IL</Avatar></IconButton>
              
                <IconButton><Avatar className={classes.avatar}>H</Avatar></IconButton>
                
                {/*<IconButton><Avatar className={classes.orangeAvatar}>M</Avatar></IconButton>
                
                
              </Grid>
           
            </Paper>*/}




                </Grid>
              </Grid>


            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);