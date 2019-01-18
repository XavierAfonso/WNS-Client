import React from 'react';
import PropTypes from 'prop-types';
import {withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Post from '../Components/Post';
import CreatePostDialog from '../Components/CreatePostDialog';
import EditPostDialog from '../Components/EditPostDialog';
import { userService } from '../Utils/user.services';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNew from '@material-ui/icons/OpenInNew';
import ProfilCard from '../Components/ProfilCard';

// const { theme } = require('../Utils/theme');

const styles = theme => ({

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

  followers: {
    marginTop: '10px',
  },

  following: {
    marginTop: '20px',
  },
  library: {
    marginTop: '10px',
  },

  profil: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '300px',
    marginTop: '20px',
  },

  newPost: {

    marginTop: '20px',
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


//const {data} = require('../Utils/data/dataProfil');


class Profil extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openEdit: false,
      currentEdit: null,
      data: [],
      mobileOpen: false,
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  //Open Dialog add btn
  handleClickAddBtnOpen = () => {
    this.setState({ open: true });
  };


  // Close add dialog
  handleClose = () => {
    this.setState({ open: false });
    window.location.reload();
  };

  // Close edit dialog
  handleCloseEdit = () => {
    this.setState({ openEdit: false });
    //console.log("CLOSE Edit");
  };

  // const fd = new FormData();
  //fd.append('pdf',this.state.selectedFile,this.state.selectedFile.name)

  handleAdd = (val) => {

    let newArray = this.state.data.slice();
    newArray.push(val);
    this.setState({ data: newArray })

    this.handleClose();
  };

  handleUpdate = (val) => {

    let arrayCpy = [...this.state.data];

    let index = this.state.data.findIndex(e => e.id === val.id);

    arrayCpy[index] = val;
    this.setState({ data: arrayCpy });

    this.handleCloseEdit();
  };

  deletePost = (id) => {

    if (window.confirm(`Delete ${id}`)) {

      console.log(id);

      userService.deleteBooksUser(id).then((val) => {
        console.log(val);
      });

      let filteredArray = this.state.data.filter(element => element.id !== id);

      return this.setState({
        data: filteredArray
      });
    }
  }

  editPost = (data) => {

    this.setState({
      openEdit: true,
      currentEdit: data
    });
  }

  componentDidMount() {

    window.scrollTo(0, 0)

    const username = window.localStorage.getItem('username');

    userService.getBooksUser(username).then(val => {

      if (val.data !== "") {
        this.setState({ data: val.data });
        //console.log(val.data);
      }

    });
  };


  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }

  render() {
    const { classes } = this.props;

    const username = window.localStorage.getItem('username');

    const renderData = this.state.data.map((element) => {
      return (<Post delete={this.deletePost} key={element.id} data={element} edit={this.editPost}
        canEdit={true} />)
    });

    return (

      //<MuiThemeProvider theme={theme}>

        <div className={classes.root}>

          {/*<CssBaseline /> */}

          <div className={classes.appContent}>
            <Header home="false" onDrawerToggle={this.handleDrawerToggle} />
            <main className={classes.mainContent}>

              <Grid container spacing={24}>
                <Grid style={{  marginTop: '10px' }} item xs={12} lg={3}>


                  <ProfilCard username={username} />

                </Grid>

                <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={6}>

                  <Paper className={classes.newPost}>

                    <Button variant="contained" color="primary" className={classes.addBtn} onClick={this.handleClickAddBtnOpen}>
                      Add
               </Button>

                    <CreatePostDialog add={this.handleAdd} close={this.handleClose} open={this.state.open} />

                    <EditPostDialog data={this.state.currentEdit} update={this.handleUpdate} close={this.handleCloseEdit} open={this.state.openEdit} />

                  </Paper>

                  {renderData}

                </Grid>

                <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>

                
              <Card  className={classes.following}>
              <CardHeader
                action={
                  <IconButton

                    onClick={() => {
                      this.redirectToTarget(`/followings`);
                    }}>
                    <OpenInNew />
                  </IconButton>
                }

                title={
                  <Typography variant="h6" gutterBottom>
                    Following
                  </Typography>
                }
              />
              </Card>

                  <Card className={classes.followers}>

                    <CardHeader
                      action={
                        <IconButton
                          onClick={() => {
                            this.redirectToTarget(`/followers`);
                          }}>
                          <OpenInNew />
                        </IconButton>
                      }

                      title={
                        <Typography variant="h6" gutterBottom>
                          Followers
                    </Typography>
                      }
                    />


                  </Card>


                         <Card  className={classes.library}>

                        <CardHeader
                          action={
                            <IconButton
                              onClick={() => {
                                this.redirectToTarget(`/librairy`);
                              }}>
                              <OpenInNew />
                            </IconButton>
                          }

                          title={
                            <Typography variant="h6" gutterBottom>
                              Library
                            </Typography>
                          }
                        />
                        </Card>


                </Grid>

              </Grid>



            </main>
          </div>
        </div>
     // </MuiThemeProvider>
    );
  }

}

Profil.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profil);