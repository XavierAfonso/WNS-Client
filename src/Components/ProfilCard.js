import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { userService } from '../Utils/user.services';

const styles  = theme => ({
  
  profil: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '300px',
    marginTop: '10px',
    //backgroundColor : 'transparent'
  },

  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
    fontSize:"60px",
  },

  divImage : {
    backgroundColor : 'transparent',
    width: '100px',
    height: '100px',

 },

 image : {
  display: 'block',
  width: '100%',
 }

});


class ProfilCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username : '',
      isSuscribe : false,
      colorBtn : "primary",
      nbFollowers : 0,
      nbFollowings : 0,
      nbBooks : 0,
      nbLikes : 0,

    }

    this.state.username = this.props.username;
  }

  follow = () => {

    if(!this.state.isSuscribe){
      userService.postFollow(this.state.username).then(val => {
        console.log(val);
      }).catch(err => console.log(err));
    }

    else{
      userService.postUnFollow(this.state.username).then(val => {
        console.log(val);
      }).catch(err => console.log(err));
    }
    this.setState({isSuscribe: !this.state.isSuscribe});
    console.log(`Follow ${this.state.username} : ${this.state.isSuscribe}`);
  }

  eventOnMouseOver = () => {
    this.setState({colorBtn: "secondary"});
  }

  eventOnMouseOut = () => {
    this.setState({colorBtn: "primary"});
  }

  componentDidMount() {

    window.scrollTo(0, 0)

    const username = window.localStorage.getItem('username');

    // Get the followings for the button
    userService.getFollowings(username).then(val => {

      if(val.data !==""){

        this.setState({nbFollowings : val.data.length});
        let test = val.data.filter(x => x.email === this.state.username);
        console.log(test);

        if(test.length > 0){
          this.setState({isSuscribe: true});
      }     
    }
  });

      // Get the nb of followers
      userService.getFollowers(this.state.username).then(val => {
        if(val.data !==""){
          this.setState({nbFollowers : val.data.length}); 
        }
    });

    // Get the nb of followings
    userService.getFollowings(this.state.username).then(val => {
      if(val.data !==""){
        this.setState({nbFollowings : val.data.length}); 
      }
    });

  // Get the nb of books
  userService.getBooksUser(this.state.username).then(val => {
    if(val.data !==""){
      this.setState({nbBooks : val.data.length}); 
    }
  });

  // Get the nb of likes
  userService.getBooksLiked(this.state.username).then(val => {
    if(val.data !==""){
      this.setState({nbLikes : val.data.length}); 
    }
  });


  };

  render() {

    const { classes } = this.props;

    return (
      <>

          <Paper className={classes.profil} elevation={1}>

        
          <Grid container justify="center" alignItems="center">
          <Typography variant="h5">
            {this.props.username}
          </Typography>
          </Grid>

          <Grid container justify="center" alignItems="center">
            {/*<Avatar alt="Remy Sharp" src="https://www.balkans.ch//assets/img/admin.png" className={classes.bigAvatar} />*/}
            <Avatar aria-label="Recipe" className={classes.bigAvatar}>
                  {this.state.username[0].toLocaleUpperCase()}
            </Avatar>
    
          </Grid>

          <Grid  style ={{textAlign: 'center', backgroundColor:'transparent'}} container justify="center" alignItems="center">

            
            Followers : {this.state.nbFollowers}<br/>
            Followings : {this.state.nbFollowings}<br/>
            Nb books posted : {this.state.nbBooks} <br/>
            Nb books on library : {this.state.nbLikes}<br/>
          
          </Grid>

          <Grid container justify="center" alignItems="center">
          {this.props.me ==="false" && 
          
          <Typography style={{marginTop:'10px', backgroundColor:'transparent'}} variant="body1">

          {this.state.isSuscribe ?
          
          <Button onMouseOut={this.eventOnMouseOut} onMouseOver={this.eventOnMouseOver} color={this.state.colorBtn} variant="outlined" className={classes.button} onClick = {this.follow} >
            
            
            {this.state.colorBtn === "primary" ?
            
            "Follow"

            :

            "Unfollow"
          }

          </Button>

        
         :

          <Button variant="outlined" className={classes.button} onClick = {this.follow} >
            Follow
          </Button>
          }


          </Typography>

          }
        </Grid>
         
          </Paper>

      </>
    );
  }
}

export default withStyles(styles)(ProfilCard);
