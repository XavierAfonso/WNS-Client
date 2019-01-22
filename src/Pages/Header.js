import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import MoreIcon from '@material-ui/icons/MoreVert';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import { AuthContext } from '../Utils/AuthProvider';
import { userService } from '../Utils/user.services';

import Tour from 'reactour';
const { steps } = require('../Utils/steps/stepsHome');

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

      isTourOpen: false,
      closeTour: false,
      anchorNotif: null,
      listNotifs: [],
    }

  };

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleNotificationsMenuOpen = event => {
    this.setState({ anchorNotif: event.currentTarget });
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleNotifsClose = () => {
    this.setState({ anchorNotif: null });
    //this.handleMobileMenuClose();
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

  startSteps = () => {

    // Need to wait until the popup menu close
    this.setState({ anchorEl: false }, this.goSteps);
  }

  // Start the guide steps
  goSteps = () => {
    this.setState({ isTourOpen: true });
  }

  deleteNotif = (notif) => {
    console.log(notif)

    let tmpListNotifs = this.state.listNotifs;
    var index = tmpListNotifs.indexOf(notif);

    //console.log(index);

    if (index > -1) {
      tmpListNotifs.splice(index, 1);
      this.setState({ listNotifs: tmpListNotifs });

      userService.postReadNotification(notif.id).then(val => console.log(val))
      .catch(err => console.log(err));
    }

    //console.log(this.state.listNotifs)
    this.handleNotifsClose();

    // postReadNotification
  }


  componentDidMount() {


    const username = window.localStorage.getItem('username');
    userService.getNotifications(username).then(val => {

      this.setState({ listNotifs: val.data })
      //console.log("icicici");
     // console.log(val.data);
    });

  }

  render() {

    return (

      <AuthContext>

        {({ error, user, signOut }) => { // authContext


          const { anchorEl, mobileMoreAnchorEl, anchorNotif } = this.state;
          const { classes } = this.props;
          const isMenuOpen = Boolean(anchorEl);
          const isNotifOpen = Boolean(anchorNotif);
          const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

          const renderListNotifications = this.state.listNotifs.map((element) => {
            return (<MenuItem key={element.id} onClick={() => { this.deleteNotif(element) }}> {element.content} </MenuItem>)
          });

          const renderMenu = (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
            >

              <MenuItem onClick={() => {
                this.redirectToTarget("/profil");
              }}>Profile</MenuItem>

              <MenuItem onClick={() => { this.redirectToTarget('/librairy') }}>Librairy</MenuItem>
              <MenuItem onClick={() => { this.redirectToTarget('/followings') }} >Followings</MenuItem>
              <MenuItem onClick={() => { this.redirectToTarget('/followers') }} >Followers</MenuItem>
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
          );

          const renderNotifications = (
            <Menu
              anchorEl={anchorNotif}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isNotifOpen}
              onClose={this.handleNotifsClose}
            >

              {this.state.listNotifs.length > 0 &&
                renderListNotifications}
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

              {this.props.home === "true" &&
                <MenuItem onClick={this.startSteps}>
                  <IconButton color="inherit">
                    <HelpIcon />
                  </IconButton>
                  <p>Question</p>
                </MenuItem>
              }

              {this.state.listNotifs.length > 0 &&
                <MenuItem onClick={this.handleNotificationsMenuOpen}>
                  <IconButton color="inherit">

                    <Badge badgeContent={this.state.listNotifs.length} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <p>Notifications</p>
                </MenuItem>
              }

              {this.state.listNotifs.length === 0 &&
                <MenuItem>
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                  <p>Notifications</p>
                </MenuItem>
              }

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
              <AppBar data-tut=".11-home-step" position="fixed" className={classes.appBar}>
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

                  <div className={classes.grow} />

                  <Button color="inherit" onClick={() => {
                    this.redirectToTarget("/");
                  }}>Home</Button>

                  <div className={classes.sectionDesktop}>

                    {this.props.home === "true" &&
                      <IconButton onClick={this.startSteps} color="inherit">
                        <HelpIcon />
                      </IconButton>
                    }

                    {this.state.listNotifs.length > 0 &&
                      <IconButton color="inherit"
                        onClick={this.handleNotificationsMenuOpen}>

                        <Badge badgeContent={this.state.listNotifs.length} color="secondary">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                    }

                    {this.state.listNotifs.length === 0 &&
                      <IconButton color="inherit">
                        <NotificationsIcon />
                      </IconButton>
                    }

                    <IconButton data-tut=".12-home-step"
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


              <Tour
                steps={steps}
                isOpen={this.state.isTourOpen}
                onRequestClose={this.closeTour} />

              {renderMenu}
              {renderMobileMenu}
              {renderNotifications}
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
