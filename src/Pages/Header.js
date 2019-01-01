import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

import { Redirect } from 'react-router-dom'

import { AuthContext } from '../Utils/AuthProvider';


/*function checkUrl() {

  let urlFull = window.location.href;
  let pathArray = window.location.href.split('/');
  let protocol = pathArray[0];
  let host = pathArray[2];
  let url = protocol + '//' + host;
  urlFull = urlFull.replace(url, "");
  return urlFull;
}

checkUrl();*/


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    // Make the app bar z-index always one more than the drawer z-index
    zIndex: theme.zIndex.drawer + 1,
  },
});

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      redirect: false,
      nextPath: '',
    }

  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  redirectToTarget = (page) => {
    this.context.router.history.push(`${page}`)
  }


  render() {


   /* if (this.state.redirect === true) {
      //this.setState({ redirect: false });

      console.log(checkUrl());

      if (checkUrl() !== this.state.nextPath) {

        //return <Redirect to={this.state.nextPath} />

        
        //return <Redirect to={this.state.nextPath} />
        //console.log("TEST");
        //this.context.router.history.push(`/target`);
      }
    }*/

    return (


      <AuthContext>

        {({ error, user, signOut }) => { // authContext


          const { anchorEl, mobileMoreAnchorEl } = this.state;
          const { classes } = this.props;
          const isMenuOpen = Boolean(anchorEl);
          const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

          const renderMenu = (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
            >

              <MenuItem onClick={() => {
                //this.setState({ nextPath: "/profil" });
                //this.setRedirect();
                this.redirectToTarget("/profil");
              }}>Profile</MenuItem>

              <MenuItem onClick={() => {this.redirectToTarget('/librairy')}}>Librairy</MenuItem>
              <MenuItem onClick={() => {this.redirectToTarget('/followings')}} >Followings</MenuItem>
              <MenuItem onClick={() => {this.redirectToTarget('/followers')}} >Followers</MenuItem>
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
          );

          const renderMobileMenu = (

            <Menu
              anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMobileMenuOpen}
              onClose={this.handleMobileMenuClose}
            >
              <MenuItem>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <p>Messages</p>
              </MenuItem>
              <MenuItem>
                <IconButton color="inherit">
                  <Badge badgeContent={11} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <p>Notifications</p>
              </MenuItem>
              <MenuItem onClick={this.handleProfileMenuOpen}>
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
                <p>Profile</p>
              </MenuItem>
            </Menu>
          );

          const { onDrawerToggle } = this.props;

          return (
            <div className={classes.root}>

            {/*position="absolute"*/}
              <AppBar position="fixed" className={classes.appBar}> 
                <Toolbar>
                  {this.props.home === "true" &&
                  <Hidden smUp>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={onDrawerToggle}
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Hidden>}

                  <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    WNS
            </Typography>

                  {/*<div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                    </div>*/}



                  <div className={classes.grow} />


                  <Button color="inherit" onClick={() => {
                    //this.setState({ nextPath: "/" });
                    //this.setRedirect();
                    this.redirectToTarget("/");
                  }}>Home</Button>

                  <div className={classes.sectionDesktop}>

                    <IconButton color="inherit">
                      <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                      <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </div>


                  <div className={classes.sectionMobile}>
                    <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                      <MoreIcon />
                    </IconButton>
                  </div>

                </Toolbar>
              </AppBar>

              {renderMenu}
              {renderMobileMenu}
            </div>
          );
        }}
      </AuthContext>
    )
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
