import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { userService } from '../Utils/user.services';

const styles  = theme => ({
  
  profil: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '150px',
    marginTop: '10px',
    //backgroundColor : 'transparent'
  },

  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80,
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


class FollowerCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username : '',
      isSuscribe : true,
      colorBtn : "primary",
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

  
  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }

  render() {

    const { classes } = this.props;

    return (
      <>

          <Paper className={classes.profil} elevation={1}>

          <div style={{backgroundColor:'transparent'}}>

          <Grid container justify="center" alignItems="center">
            <Typography variant="h5">
              {this.props.username}
           </Typography>
          </Grid>

          <Grid container justify="center" alignItems="center">

          <IconButton

          onClick={() => {
            this.redirectToTarget(`/profil/${this.props.username}`);
          }}>
            <Avatar alt="Remy Sharp" src="https://www.balkans.ch//assets/img/admin.png" className={classes.bigAvatar} />
            </IconButton>
          </Grid>

          <Typography variant="body1">

          </Typography>

          
          {/*<Grid container justify="center" alignItems="center">
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
        </Grid>*/}
          
          </div>
          </Paper>

      </>
    );
  }
}

export default withStyles(styles)(FollowerCard);
