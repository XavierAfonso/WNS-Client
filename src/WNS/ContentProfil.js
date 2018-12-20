import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Post from '../Components/Post';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({

  root: {
    flexGrow: 1,
    paddingTop: '20px',
  },

  profil: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height : '500px',
    marginTop: '10px',
  },

  newPost : {

    marginTop: '10px',
    height : '100px',
    display: 'flex',
  },

  addBtn : {

    display: 'flex',
    marginLeft: 'auto',
    marginTop:'60px',
    marginRight:'15px',
    marginBottom:'15px',
  },

  /*addBtn2 : {

    display: 'flex',
    marginTop:'60px',
    marginRight:'15px',
    marginBottom:'15px',
  }*/

});


class Content extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { classes } = this.props;

    return (
      
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>

            <Paper className={classes.profil} elevation={1}>
              <Typography variant="h5" component="h3">
                Profil
              </Typography>
              <Typography component="p">
                Description
              </Typography>
            </Paper>

          </Grid>

          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={6}>

          <Paper className={classes.newPost}>


          <Button variant="contained" color="primary" className={classes.addBtn} onClick={this.handleClickOpen}>
          Primary
         </Button>  

         <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>

          </Paper>

          <Post />
          <Post />
          <Post />

          </Grid>

          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>

          </Grid>

        </Grid>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);