import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Post from '../Components/Post';


const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '20px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: '10px',
    height: 'auto',
  },
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});


class Content extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} lg={8}>

            <Post />
           
           {/* <Post /> 
            <Post />
            <Post />
            <Post />
            */}

          </Grid>
          <Grid item xs={12} lg={4}>

            <Paper className={classes.paper}>
              Following
              <Grid container justify="center" alignItems="center">
                <Avatar className={classes.avatar}>H</Avatar>
                <Avatar className={classes.orangeAvatar}>N</Avatar>
                <Avatar className={classes.purpleAvatar}>OP</Avatar>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              Followers
              <Grid container justify="center" alignItems="center">
                <Avatar className={classes.avatar}>P</Avatar>
                <Avatar className={classes.orangeAvatar}>W</Avatar>
                <Avatar className={classes.purpleAvatar}>IL</Avatar>
                <Avatar className={classes.avatar}>H</Avatar>
                <Avatar className={classes.orangeAvatar}>M</Avatar>
              </Grid>
            </Paper>

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