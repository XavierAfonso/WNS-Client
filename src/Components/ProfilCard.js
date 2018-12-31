import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Post from '../Components/Post';
import { withStyles } from '@material-ui/core/styles';


const styles  = theme => ({
  
  profil: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '300px',
    marginTop: '10px',
    //backgroundColor : 'transparent'
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
    }

    this.state.username = this.props.username;
  }

  follow = () => {

    console.log(`Follow ${this.state.username}`);

  }
  render() {

    const { classes } = this.props;

    return (
      <>

          <Paper className={classes.profil} elevation={1}>

          <div style={{backgroundColor:'transparent'}}>
          <Typography variant="h5">
            {this.props.username}
              </Typography>

              <div className = {classes.divImage}>
                <img className = {classes.image} src="https://www.balkans.ch//assets/img/admin.png" alt="" />
              </div>

          <Typography variant="body1">
            Followers : 3 <br/>
            Followings : 5 <br/>
            Nombre de livres publiés : 8<br/>
            Nombre de livres dans la bibliothèque : 4<br/>
          </Typography>
          <Typography variant="body1">

          </Typography>

          {this.props.me ==="false" && 
          
          <Typography style={{marginTop:'10px', backgroundColor:'transparent'}} variant="body1">

          <Button variant="outlined" className={classes.button} onClick = {this.follow} >
            Suscribe
          </Button>
          </Typography>

          }

          </div>
          </Paper>

     

      </>
    );
  }
}

export default withStyles(styles)(ProfilCard);
