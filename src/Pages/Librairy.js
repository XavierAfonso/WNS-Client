import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Post from '../Components/Post';


import ProfilCard from '../Components/ProfilCard';

const {data} = require('../Utils/dataLibrairy');

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


//const datafull = 

class ProfilOther extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      data : data,
    }

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }

  render() {



    const { classes } = this.props;

    const renderData = this.state.data.map((element) => {
      return (
      
        <>
      
      

      <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={4}>
      <Post delete = {this.deletePost} key= {element.id} data={element} edit={this.editPost}  />
      </Grid>


      </>
      
     )
     });

    return (

      <MuiThemeProvider theme={theme}>
      
      <div className={classes.root}>
        
        {/*<CssBaseline /> */}

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

ProfilOther.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilOther);