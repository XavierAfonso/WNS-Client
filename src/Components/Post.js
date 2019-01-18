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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode';
import DeleteIcon from '@material-ui/icons/Delete';
import PDFViewer from '../Components/PdfViewer';
import { userService } from '../Utils/user.services';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  card: {
    //maxWidth: 700,
    marginTop: '10px',
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
      title: '',
      description: '',
      date: '',
      linkPdf: '',
      like: false,
      initial: '',
      canEdit: false,
      tags: [],
      language: '',
      test: false,

    };


    this.state.id = this.props.data.id;
    this.state.author = this.props.data.authorId;
    this.state.title = this.props.data.title;
    this.state.description = this.props.data.postDescription;
    this.state.date = this.props.data.createdDate;

    this.state.linkPdf = `http://127.0.0.1:8080/books/${this.state.id}/pdf`;



    this.state.language = this.props.data.language;

    this.state.initial = this.props.data.authorId[0].toUpperCase();

    this.state.tags = this.props.data.tags;

    this.state.like = this.props.like;
    this.state.canEdit = this.props.canEdit;



  }

  // MoreVertIcon Click (Find the Position, I think) 
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  // Close MoreVertIcon
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

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

    const username = window.localStorage.getItem('username');

    if (!this.state.like) {


      userService.getUser(username).then(response => {

        console.log(response.data.likes);

        let isExist = response.data.likes;

        if (isExist.indexOf(this.state.id) === -1) {
          userService.likeAbook(this.state.id).then(val => console.log(val));
        }
        else {
          console.log("Already liked");
        }



      })

      //userService.likeAbook(this.state.id).then(val => console.log(val));
    }
    else {
      console.log(this.state.id);
      userService.unLikeAbook(this.state.id).then(val => console.log(val));
    }

    this.setState({ like: !this.state.like });
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

  shouldComponentUpdate(nextProps, nextState) {

    if (this.state.expanded !== nextState.expanded || this.state.like !== nextState.like) {
      return true;
    }
    else {
      return false;
    }

  }

  render() {

    const { classes } = this.props;
    // const { anchorEl } = this.state;
    //const open = Boolean(anchorEl);


    const renderTags = this.state.tags.map((tag) => {
      return (<Chip key={tag} label={tag} className={classes.chip} />)
    });

    //Check privileges
    const checkRole = () => {

      if (this.state.canEdit) {
        return (
          <>
            <IconButton
              onClick={this.deletePost}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )
      }
      else {
        return (
          <>
          </>
        )
      }
    }

    return (

      <Card data-tut=".4-home-step" className={classes.card} >


        <CardHeader

          avatar={

            < div style={{ background: 'transparent' }}>

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

        <CardContent style={{ marginLeft: '10px' }}>

          <Typography variant="h6" style={{ paddingBottom: '10px' }}>
            {this.state.title}
          </Typography>

          <Typography component="p">
            {this.state.description}
          </Typography>
        </CardContent>

        <CardContent>


          {renderTags}

          {this.state.language ? <Chip key={this.state.language} label={this.state.language} className={classes.chip} /> : null}


        </CardContent>


        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton data-tut=".5-home-step"
            aria-label="Add to favorites"
            onClick={this.clickFavorite}
          >

            {this.state.like ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteIcon />}

          </IconButton>

          <IconButton data-tut=".7-home-step"
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />

          </IconButton>

          <IconButton data-tut=".8-home-step"
            onClick={this.openPDF}
          >

            <ChromeReaderMode />

          </IconButton>

        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>

          <CardContent>

            <PDFViewer

              pdfBlob={this.state.linkPdf}
              width="100%"
              height="500px"
              containerId={"container" + this.state.id}
            />
          </CardContent>

        </Collapse>
      </Card>
    );
  };

  componentDidUpdate(prevProps) {

    if (this.props.data !== prevProps.data) {

      console.log("DATA CHANGE");

      this.setState({

        id: this.props.data.id,
        author: this.props.data.author,
        title: this.props.data.title,
        description: this.props.data.description,
        date: this.props.data.date,
        linkPdf: this.props.data.linkPdf,
        like: this.props.data.like,
        initial: this.props.data.initial,
        tags: this.props.data.tags,
        language: this.props.data.language,
        me: this.props.data.canEdit,
        firstTime: false,
      });

    }
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
