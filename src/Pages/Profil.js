import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Post from '../Components/Post';

import CreatePostDialog from '../Components/CreatePostDialog';
import EditPostDialog from '../Components/EditPostDialog';

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
    height: '300px',
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


const {data} = require('../Utils/data/dataProfil');


class Profil extends React.Component {

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

  //Open Dialog add btn
  handleClickAddBtnOpen = () => {
    this.setState({ open: true });
  };


  // Close add dialog
  handleClose = () => {
    this.setState({ open: false });
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
      this.setState({data:newArray})

      this.handleClose();
    };

    handleUpdate= (val) => {

      let arrayCpy = [...this.state.data];
     
      let index = this.state.data.findIndex(e => e.id === val.id);

      arrayCpy[index] = val;
      this.setState({data : arrayCpy});

      this.handleCloseEdit();
    };

    deletePost = (id) => {

      let filteredArray = this.state.data.filter(element => element.id !== id);

      return this.setState({
        data: filteredArray
      });
    }

    editPost = (data) => {

      this.setState({
        openEdit: true,
        currentEdit: data
      });
    }

  componentDidMount() {
    window.scrollTo(0, 0)
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;

    const renderData = this.state.data.map((element) => {
      return (<Post delete = {this.deletePost} key= {element.id} data={element} edit={this.editPost} />)
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


          <ProfilCard  me="true" username="Xavier"/>

          </Grid>

          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={6}>

            <Paper className={classes.newPost}>

              <Button variant="contained" color="primary" className={classes.addBtn} onClick={this.handleClickAddBtnOpen}>
                Add
               </Button>

               <CreatePostDialog add = {this.handleAdd} close ={this.handleClose} open={this.state.open}/>

               <EditPostDialog data = {this.state.currentEdit} update = {this.handleUpdate} close ={this.handleCloseEdit} open={this.state.openEdit}/>

            </Paper>

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

Profil.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profil);