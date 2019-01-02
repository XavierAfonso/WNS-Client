import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import FollowingCard from '../Components/FollowingCard';

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


const {data} = require('../Utils/data/dataFollowings');


class Followings extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data : data,
      mobileOpen: false,
    }
  }

  
  render() {
    const { classes } = this.props;


    const renderData = this.state.data.map((element,i) => {
      return (
      
      <Grid  key={i} style={{ backgroundColor: 'transparent' }} item xs={6} md={3}>
        <FollowingCard key={i}  username = {element.username}  />
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