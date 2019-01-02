import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Post from '../Components/Post';


const {data} = require('../Utils/data/dataLibrairy');

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

class Librairy extends React.Component {

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

    const renderData = this.state.data.map((element,i) => {
      return (
      
      
      <Grid key={i} style={{ backgroundColor: 'transparent' }} item xs={12} lg={4}>
      <Post  key={i} delete = {this.deletePost} data={element} edit={this.editPost}  />
      </Grid>

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

Librairy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Librairy);