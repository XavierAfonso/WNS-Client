import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

import ChipInput from 'material-ui-chip-input';
import CircularProgress from '@material-ui/core/CircularProgress';

import { userService } from '../Utils/user.services';

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemCategory: {
    //backgroundColor: '#232f3e',
    backgroundColor: 'purple',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: 16,
    paddingBottom: 16,
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2,
  },

  toolbar: theme.mixins.toolbar,

  customZIndex: {
    zIndex: 1100 - 1,
  },

  // Navigator background
  paper :{
    //backgroundColor : "yellow",
  },

  genres: {
    marginTop: '10px',
  },

  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },

});

class Navigator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      bookContent: '',
      tags: [],
      displayCircularProgress : false,
      //selectedAuthors: [],
      //selectedLanguages: [],
    }
  }

  //Title
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  //Description
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // Tags
  handleTags = (val) => {
    this.setState({ tags: val});
  };

  // Search Button
  searchBooks = () => {

  this.setState({ displayCircularProgress: true});
     
  let book_post_description = this.state.description ==='' ? null : this.state.description;
  let book_title = this.state.title ==='' ? null : this.state.title;
  let book_content = this.state.bookContent ==='' ? null : this.state.bookContent;
  let book_tags = this.state.tags.length ===0 ? null :  this.state.tags;
    
         
    /*console.log("SEARCH");
    console.log("Title: " + book_title);
    console.log("Descritpion: " + book_post_description);
    console.log("BookContent: " + book_content);
    console.log(book_tags);*/


    userService.searchBook(book_title,book_post_description,book_content,book_tags).then(val => {
      //console.log(val.data);

      if(val.data.length > 0){
        this.props.changeValue(val.data);
      }
      else{
        this.props.changeValue([]);
      }
      this.setState({ displayCircularProgress: false});
    }).catch(() => {
      this.setState({ displayCircularProgress: false});
    })

    /*const filter =  {
     title: this.state.title,
     description: this.state.description,
     selectedAuthors: this.state.selectedAuthors,
     selectedLanguages: this.state.selectedLanguages,
     tags: this.state.tags,
    }*/

   
  };


  // Authors
  updateSelectedAuthors = (val) => {
    this.setState({ selectedAuthors: val });
  }

  // Languages
  updateSelectedLanguages = (val) => {
    this.setState({ selectedLanguages: val });
  }


  render() {
    const { classes, changeValue, ...other } = this.props;
    return (

      <Drawer classes={{ paper: classes.paper }} className={classes.customZIndex} variant="permanent" {...other}>

        <div className={classes.toolbar} />
        <div style={{ padding: '30px' }}>

        <div data-tut=".1-home-step" >

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title" name="title" value={this.state.title} autoComplete="title" onChange={this.handleInputChange} />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              rowsMax="4"
              value={this.state.description}
              onChange={this.handleChange('description')}
              className={classes.textField}
              margin="normal"
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <TextField
              id="standard-multiline-flexible"
              label="Content"
              multiline
              rowsMax="4"
              value={this.state.bookContent}
              onChange={this.handleChange('bookContent')}
              className={classes.textField}
              margin="normal"
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <ChipInput
              label="Tags"
              variant='standard'
              onChange={(chips) => this.handleTags(chips)}
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <Button  data-tut=".2-home-step" variant="contained" color="primary" className={classes.button} onClick={this.searchBooks}>
              Search
                <Search className={classes.rightIcon} />
            </Button>
          </FormControl>

          <Grid container justify="center" alignItems="center">
          {this.state.displayCircularProgress === true &&
          <CircularProgress className={classes.progress}/>}
          </Grid>
          </div>

        </div>
        
      </Drawer>
    );
  }
}

/*Navigator.propTypes = {
  //classes: PropTypes.object.isRequired,
};*/

export default withStyles(styles)(Navigator);