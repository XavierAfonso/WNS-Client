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

  profil: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '500px',
    marginTop: '10px',
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


const {data} = require('../Utils/dataProfilOther');

class ProfilOther extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openEdit : false,
      currentEdit : null,
      data : data,
      mobileOpen: false,
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
    console.log(this.props.match.params.name);
    if(this.props.match.params.name==="Xavier"){
      this.redirectToTarget(`/profil`)
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
      return (<Post key= {element.id} data={element} />)
     });

    return (

      <MuiThemeProvider theme={theme}>
      
        <div className={classes.root}>
          
          {/*<CssBaseline /> */}

          <div className={classes.appContent}>
            <Header home = "false" onDrawerToggle={this.handleDrawerToggle} />
              <main className={classes.mainContent}>

              <Grid container spacing={24}>
          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>

          <ProfilCard  me="false" username={this.props.match.params.name}/>
  
          </Grid>

          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={6}>


            {renderData}

          </Grid>

          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>


          </Grid>

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