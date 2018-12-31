import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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


import AlertDialog from './AlertDialog';


let cpt = 1;

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
});

class CreatePostDialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedFile : "",
      title : '',
      description : '',
      language : '',
      tags : [],

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
      console.log()
    };
  

  //Select the pdf file
  fileSelectedHandler  = event => {
    console.log(event.target.files[0])
    this.setState({
      selectedFile:event.target.files[0]
    })
  };

  // Language
  handleChangeLangage = event => {
    this.setState({ language: event.target.value });
  };

  closeDialog = () => {

    this.setState({
      selectedFile : "",
      title : '',
      description : '',
      language : '',
      tags : [],
    });

    this.props.close();
  }

  addPost = () => {


    //Check the data


    console.log("Title: " + this.state.title);
    console.log("Description: " + this.state.description);
    console.log("Language: " + this.state.language);
    console.log("Tags : " + this.state.tags)

    if(this.state.title !=="" && this.state.description  !=="" && this.state.language  !== "")
    {


    //If correct 


    const data = 
      {
    
        id : cpt,
        title : this.state.title,
        author : "Xavier Vaz Afonso",
        initial: "X",
        description : this.state.description,
        date : "now",
        linkPdf : "/pdf/main.pdf", //http://www.orimi.com/pdf-test.pdf
        like : false,
        tags : this.state.tags,
        language: this.state.language,
        me : true,
      }

    cpt++;
    
    this.closeDialog();
    this.props.add(data);
  
    //else
    //this.props.close();

    }
  }

  render() {

    const { classes } = this.props;

    return (
      <>


        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >

        { /*<AlertDialog /> */}

          <DialogTitle id="form-dialog-title">Post a new book</DialogTitle>

          
          <DialogContent>
            <DialogContentText>
              To add a new book, please enter the title, the description, tags and the pdf.
            </DialogContentText>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input value={this.state.title} id="title" name="title" autoComplete="title" onChange={this.handleInputChange} />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                rowsMax="10"
                //value={this.state.description}
                onChange={this.handleChange('description')}
                className={classes.textField}
                margin="normal"
              />
            </FormControl>


            <div>

              <Grid container>

                <Grid item xs={8} lg={10} style={{ backgroundColor: 'transparent', paddingTop: '12px' }}>

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
                    <Input id="fileName" name="fileName" value={this.state.selectedFile.name} disabled />
                  </FormControl>

                </Grid>

                <Grid item xs={4} lg={2} style={{ backgroundColor: 'transparent', paddingTop: '30px', paddingLeft: '10px' }}>

                  <InputLabel htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </InputLabel>

                </Grid>

              </Grid>

            </div>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="select-language">Language</InputLabel>
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
                onChange={(chips) => this.handleTags(chips)}
                //value={this.state.tags}
                defaultValue={this.state.tags}
              />

            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addPost} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

      </>
    );
  }
}


export default withStyles(styles)(CreatePostDialog);