import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Post from '../Components/Post';


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
    }
  }

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


          <Button variant="contained" color="primary" className={classes.addBtn}>
          Primary
         </Button>  

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