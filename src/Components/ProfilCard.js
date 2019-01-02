import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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
    }

    this.state.username = this.props.username;
  }

  follow = () => {
    this.setState({isSuscribe: !this.state.isSuscribe});
    console.log(`Follow ${this.state.username} : ${this.state.isSuscribe}`);
  }

  eventOnMouseOver = () => {
    this.setState({colorBtn: "secondary"});
  }

  eventOnMouseOut = () => {
    this.setState({colorBtn: "primary"});
  }

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
            <Avatar alt="Remy Sharp" src="https://www.balkans.ch//assets/img/admin.png" className={classes.bigAvatar} />
          </Grid>

          <Grid  style ={{textAlign: 'center', backgroundColor:'transparent'}} container justify="center" alignItems="center">

            
            Followers : 3<br/>
            Followings : 5<br/>
            Nb books posted : 8 <br/>
            Nb books on library : 12 <br/>
          
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
