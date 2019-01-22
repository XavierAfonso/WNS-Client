import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Post from '../Components/Post';

import { userService } from '../Utils/user.services';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  progress: {
    margin: theme.spacing.unit * 2,
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
      data : [],
      like : true,
      messageEmpty : "",
      displayCircularProgress: true,
    }

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }

  
  getBooksLiked = (username) => {

    userService.getBooksLiked(username).then(val => {

        const username = window.localStorage.getItem('username');
        console.log(username);
        console.log(this.props.match.params.name);


        if(this.props.match.params.name !== username && this.props.match.params.name ){
          this.setState({like : false});
        }

        if(val.data.length > 0){
          this.setState({data : val.data,
          messageEmpty : ""});
          console.log(val.data);
        }
        else{
          this.setState({ messageEmpty: " There are no books." })
        }
        this.setState({ displayCircularProgress: false });
     
    }).catch(err => {
      console.log(err);
      this.setState({ messageEmpty: "There are no books." })
      this.setState({ displayCircularProgress: false });
    });
  }
  
  componentDidMount(){

    let username = "";

    if(this.props.match.params.name){

      console.log("ici");
      username = this.props.match.params.name;

      userService.getUser(username).then(val => {
        this.getBooksLiked(username);

      }).catch(err => {
        console.log(err);
        this.redirectToTarget(`/`)
      })
    }

    else{
       username = window.localStorage.getItem('username');
       this.getBooksLiked(username)
    }
  }


  render() {



    const { classes } = this.props;

    const renderData = this.state.data.map((element,i) => {
      return (
      
      
      <Grid key={i} style={{ backgroundColor: 'transparent' }} item xs={12} lg={4}>
      <Post like={this.state.like} key={i} delete = {this.deletePost} data={element} edit={this.editPost}  />
      </Grid>

     )
     });  

    return (

      //<MuiThemeProvider theme={theme}>
      
      <div className={classes.root}>
        
        {/*<CssBaseline /> */}

        <div className={classes.appContent}>
          <Header home = "false" onDrawerToggle={this.handleDrawerToggle} />
            <main className={classes.mainContent}>
           
            <Grid style={{ marginTop: "10px" }} container spacing={24}>
              <Grid container justify="center" alignItems="center">
                {this.state.displayCircularProgress === true &&
                  <CircularProgress className={classes.progress} />}
                {this.state.messageEmpty}
              </Grid>
              {renderData}
          </Grid>
          
          </main>
        </div>
      </div>
    //</MuiThemeProvider>
    );
  }
}

Librairy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Librairy);