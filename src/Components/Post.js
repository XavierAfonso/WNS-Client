import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//import PDFObject from '../pdfobject';
import PDFViewer from '../Components/PdfViewer'; 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  card: {
    //maxWidth: 700,
    marginTop:'10px',
  },
  media: {
    height: 0,
    paddingTop: '16.25%', // 16:9
    //paddingLeft:'100px',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      //marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

  chip: {
    margin: theme.spacing.unit,
  },

});

class RecipeReviewCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      expanded: false,

      id: '',
      author: '',
      title:'',
      description : '',
      date : '',
      linkPdf : '',
      like : false,
      initial : '',
      canEdit : false,
      tags : [],
      language : '',

    };

    
    this.state.id = this.props.data.id;
    this.state.author = this.props.data.author;
    this.state.title = this.props.data.title;
    this.state.description = this.props.data.description;
    this.state.date = this.props.data.date;
    this.state.linkPdf = this.props.data.linkPdf;
    this.state.like = this.props.data.like;
    this.state.initial = this.props.data.initial;
    this.state.tags = this.props.data.tags;
    this.state.language = this.props.data.language;
    this.state.canEdit = this.props.data.canEdit;

    //console.log(this.props.data);

  }

  // MoreVertIcon Click (Find the Position, I think) 
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  // Close MoreVertIcon
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  /*componentDidMount() {
    PDFObject.embed("../pdf/main.pdf", "#example1");
  }*/

  // Expand the pdf part
  handleExpandClick = () => {
    console.log("EXPAND");
    this.setState(state => ({ expanded: !state.expanded }));
  };

  // More Info
  moreInfo = () => {
    console.log("More Info");
    this.handleClose();
  }

   // Comments
   showComments = () => {
    console.log("Comments");
    this.handleClose();
  }

  // Delete
  deletePost = () => {
    console.log("Delete ID : " + this.state.id);
    this.props.delete(this.state.id);
  }

  // Delete
  editPost = () => {
    //console.log("Edit ID : " + this.state.id);
    this.props.edit(this.props.data);
  }

  // Favorite
  clickFavorite = () => {
    console.log("Favorite");
    this.setState({like: !this.state.like});
  }

  // Share
  clickShare = () => {
    console.log("Share");
  }

  // OpenPDF
  openPDF = () => {
    console.log("OPEN PDF");
    const url = this.state.linkPdf;
    window.open(url, '_blank');
  }


  goProfilUser = () => {

    console.log("GO PROFIL");
  }

  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }
  
  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);


    const renderTags = this.state.tags.map((tag) => {
      return (<Chip key={tag} label={tag} className={classes.chip} />)
     });

    //Check privileges
    const checkRole = () => {

      if(this.state.canEdit){
        return(
        <>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
        <MoreVertIcon />
        </IconButton>

          <IconButton
          onClick={this.editPost}
          >  
            <EditIcon/>
          </IconButton>
  
          <IconButton
          onClick={this.deletePost}
          >  
            <DeleteIcon/>
          </IconButton>
        </>
      )
    }
    else{
      return(
      <>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
        <MoreVertIcon />
        </IconButton>
      </>
      )
    }
  }

    return (
      
      <Card className={classes.card} >


        <CardHeader 
          
          avatar={

            < div style={{background:'transparent'}}>
            
            <IconButton

              onClick={() => {
                this.redirectToTarget(`/profil/${this.state.author}`);
              }}
            
            >
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {this.state.initial}
              </Avatar>
            </IconButton>
            </div>
          }

          action={checkRole()}
          
          title={this.state.author}
          
          subheader={this.state.date}
          
        />

          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        
          <MenuItem onClick={this.moreInfo}>More Info</MenuItem>
          <MenuItem onClick={this.showComments}>Comments</MenuItem>

        </Menu>
      
        <CardContent style={{marginLeft:'10px'}}>

        <Typography variant="h6" style={{paddingBottom:'10px'}}>
          {this.state.title}
          </Typography>

          <Typography component="p">
          {this.state.description}
          </Typography>
        </CardContent>

        <CardContent>
         
         
          {renderTags}
          
          {this.state.language ? <Chip key={this.state.language} label={this.state.language} className={classes.chip}/>  : null}

        
        </CardContent>
        
        
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton 
          aria-label="Add to favorites"
          onClick={this.clickFavorite}
          >

          {this.state.like ?   <FavoriteIcon style={{color:'red'}}/> : <FavoriteIcon/> }
          
          </IconButton>
          <IconButton 
          aria-label="Share"
          onClick={this.clickShare}
          >
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
            
          </IconButton>

          <IconButton
            onClick={this.openPDF}
          >

          <ChromeReaderMode/>
          
          </IconButton>
          





        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          
          <CardContent>

          <PDFViewer

            pdfBlob= {this.state.linkPdf}
            width="100%"
            height="500px"
            containerId = 'testpdf'
          />

            {/*<Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>

            */}


          </CardContent>

        </Collapse>
      </Card>
    );
  };

  componentDidUpdate(prevProps) {

    if (this.props.data !== prevProps.data) {

      console.log("DATA CHANGE");
            
      this.setState({

        id : this.props.data.id,
        author : this.props.data.author,
        title : this.props.data.title,
        description : this.props.data.description,
        date : this.props.data.date,
        linkPdf : this.props.data.linkPdf,
        like : this.props.data.like,
        initial : this.props.data.initial,
        tags : this.props.data.tags,
        language : this.props.data.language,
        me : this.props.data.canEdit,
        firstTime : false,
      });

    }
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
