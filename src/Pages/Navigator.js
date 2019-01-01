import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';

import ChipInput from 'material-ui-chip-input';
import AutoComplete from '../Components/AutoComplete';

const authors = [
  { label: 'Oliver Hansen' },
  { label: 'Van Henry' },
  { label: 'April Tucker' },
  { label: 'Ralph Hubbard' },
  { label: 'Omar Alexander' },
  { label: 'Carlos Abbott' },
];

const languages = [
  { label: 'French' },
  { label: 'English' },
  { label: 'German' },
  { label: 'Italian' },
];

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
      tags: [],
      selectedAuthors: [],
      selectedLanguages: [],
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

    console.log("SEARCH");
    console.log("Title: " + this.state.title);
    console.log("Descritpion: " + this.state.description);
    console.log("Authors: " + this.state.selectedAuthors);
    console.log("Languages: " + this.state.selectedLanguages);
    console.log("Tags : " + this.state.tags)
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
    const { classes, ...other } = this.props;
    return (

      <Drawer className={classes.customZIndex} variant="permanent" {...other}>

        <div className={classes.toolbar} />
        <div style={{ padding: '30px' }}>

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
            <AutoComplete sendData = {this.updateSelectedAuthors} label = "Authors" data = {authors} />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <AutoComplete  sendData = {this.updateSelectedLanguages} label = "Languages" data = {languages} />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <ChipInput
              label="Tags"
              variant='standard'
              onChange={(chips) => this.handleTags(chips)}
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.searchBooks}>
              Search
                <Search className={classes.rightIcon} />
            </Button>
          </FormControl>

        </div>
        
      </Drawer>
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);