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

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

import ChipInput from 'material-ui-chip-input';
import Select from '@material-ui/core/Select';


const languages = [
  'French',
  'English',
  'German',
  'Spanish',
  'Italian',
];


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
      language: [],
      selectedFile : "",
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeLangage = event => {
    this.setState({ language: event.target.value });
  };

  fileSelectedHandler  = event => {
    console.log(event.target.files[0])
    this.setState({
      selectedFile:event.target.files[0]
    })

    const fd = new FormData();
    //fd.append('pdf',this.state.selectedFile,this.state.selectedFile.name)

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
                <DialogTitle id="form-dialog-title">Post a new book</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To add a new book, please enter the title, the description, tags and the pdf.
            </DialogContentText>



                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input id="title" name="title" autoComplete="title" onChange={this.handleInputChange} />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    <TextField
                      id="standard-multiline-flexible"
                      label="Description"
                      multiline
                      rowsMax="10"
                      value={this.state.multiline}
                      className={classes.textField}
                      margin="normal"
                    />
                  </FormControl>

                
                  <div>
                 
                  <Grid container>
                  
                  <Grid item xs={8} lg={10} style ={{backgroundColor:'transparent', paddingTop:'12px'}}>


                  <Input
                    accept="image/*"
                    className={classes.input}
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={this.fileSelectedHandler}
                  />


                  <FormControl margin="normal" fullWidth>
                  {/*<InputLabel htmlFor="fileName">File name</InputLabel>*/}
                  <Input id="fileName" name="fileName" value={this.state.selectedFile.name} disabled/>
                  </FormControl>

                  </Grid>

                  <Grid item xs={4} lg={2} style ={{backgroundColor:'transparent', paddingTop:'30px', paddingLeft:'10px'}}>
      

                  <InputLabel htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </InputLabel>
                  
                  </Grid>

                  </Grid>
              
                  </div>

           


                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="select-language">languages</InputLabel>
                    <Select
                      value={this.state.language}
                      onChange={this.handleChangeLangage}
                      input={<Input id="select-language" />}
                    //MenuProps={MenuProps}
                    >
                      {languages.map(language => (
                        <MenuItem key={language} value={language}>
                          {language}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>


                  <FormControl margin="normal" fullWidth>


                    <ChipInput
                      label="Tags"
                      onChange={(chips) => this.handleChange(chips)}
                    />

                  </FormControl>








                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
            </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Add
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