import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Post from '../Components/Post';

import CreatePostDialog from '../Components/CreatePostDialog';


const styles = theme => ({

  root: {
    flexGrow: 1,
    paddingTop: '20px',
  },

  profil: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '500px',
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
      data : [
        {
      
          id : 0,
          title : "Premier Livre",
          author : "Xavier Vaz Afonso",
          initial: "X",
          description : "Super livre sans description ;)",
          date : "27 December 2018",
          linkPdf : "http://www.orimi.com/pdf-test.pdf",
          like : false,
          tags : ["awesome","funny"],
          language : "English",
          me : true,
        },
      ]
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    console.log("OPEN");
  };

  handleClose = () => {
    this.setState({ open: false });
    console.log("CLOSE");
  };

   // const fd = new FormData();
    //fd.append('pdf',this.state.selectedFile,this.state.selectedFile.name)

    handleAdd = (val) => {
      console.log("BIEN RECU");
      console.log(val);
      this.state.data.push(val);
      this.handleClose();
    };

    deletePost = (id) => {
      console.log("DELETE POST FROM PARENT  " + id);
      console.log( this.state.data);
   
      this.setState({
        data: this.state.data.filter(element => element.id != id)
      });
      //console.log(this.state.data);
    }


  componentDidMount() {
    window.scrollTo(0, 0)
  };

  render() {
    const { classes } = this.props;

    console.log(this.state.data);

    const renderData = this.state.data.map((element) => {
      return (<Post delete = {this.deletePost} key= {element.id} data={element}/>)
     });

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
                Add
               </Button>

               <CreatePostDialog add = {this.handleAdd} close ={this.handleClose} open={this.state.open}/>

            </Paper>

            {renderData}

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