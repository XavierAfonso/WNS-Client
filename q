[1mdiff --git a/src/App.js b/src/App.js[m
[1mindex b8db727..cc119ef 100644[m
[1m--- a/src/App.js[m
[1m+++ b/src/App.js[m
[36m@@ -6,6 +6,11 @@[m [mimport RegisterPage from './Pages/Register';[m
 import { AuthContext } from './Utils/AuthProvider';[m
 import HomePage from './WNS/Home';[m
 import ProfilPage from './WNS/Profil';[m
[32m+[m[32mimport ProfilOther from './WNS/ProfilOther';[m[41m[m
[32m+[m[41m[m
[32m+[m[32mimport LibrairyPage from './WNS/librairy';[m[41m[m
[32m+[m[41m[m
[32m+[m[41m[m
 import './css/general.css';[m
 [m
 import AutoComplete from './Pages/AutoComplete';[m
[36m@@ -43,10 +48,11 @@[m [mclass App extends Component {[m
       <Switch>[m
         {/*<ProtectedRoute path="/" exact component={HomePage} />*/}[m
         <Route path="/" exact component={HomePage} />[m
[32m+[m[32m        <Route path="/profil/:name" component={ProfilOther} />[m[41m[m
         <Route path="/profil" component={ProfilPage} />[m
         <Route path="/login" component={LoginPage} />[m
[32m+[m[32m        <Route path="/librairy" component={LibrairyPage} />[m[41m[m
         <Route path="/register" component={RegisterPage} />[m
[31m-        <Route path="/tmp" component={AutoComplete} />[m
         <Route path="/*" component={LoginPage} />[m
       </Switch>[m
     );[m
[1mdiff --git a/src/Components/CreatePostDialog.js b/src/Components/CreatePostDialog.js[m
[1mindex c536065..9819ca1 100644[m
[1m--- a/src/Components/CreatePostDialog.js[m
[1m+++ b/src/Components/CreatePostDialog.js[m
[36m@@ -151,7 +151,6 @@[m [mclass CreatePostDialog extends React.Component {[m
     return ([m
       <>[m
 [m
[31m-[m
         <Dialog[m
           open={this.props.open}[m
           onClose={this.handleClose}[m
[1mdiff --git a/src/Components/Post.js b/src/Components/Post.js[m
[1mindex f0bb714..e3c65e4 100644[m
[1m--- a/src/Components/Post.js[m
[1m+++ b/src/Components/Post.js[m
[36m@@ -82,7 +82,7 @@[m [mclass RecipeReviewCard extends React.Component {[m
       linkPdf : '',[m
       like : false,[m
       initial : '',[m
[31m-      me : false,[m
[32m+[m[32m      canEdit : false,[m[41m[m
       tags : [],[m
       language : '',[m
 [m
[36m@@ -99,7 +99,7 @@[m [mclass RecipeReviewCard extends React.Component {[m
     this.state.initial = this.props.data.initial;[m
     this.state.tags = this.props.data.tags;[m
     this.state.language = this.props.data.language;[m
[31m-    this.state.me = this.props.data.me;[m
[32m+[m[32m    this.state.canEdit = this.props.data.canEdit;[m[41m[m
 [m
     //console.log(this.props.data);[m
 [m
[36m@@ -167,6 +167,20 @@[m [mclass RecipeReviewCard extends React.Component {[m
     window.open(url, '_blank');[m
   }[m
 [m
[32m+[m[41m[m
[32m+[m[32m  goProfilUser = () => {[m[41m[m
[32m+[m[41m[m
[32m+[m[32m    console.log("GO PROFIL");[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  static contextTypes = {[m[41m[m
[32m+[m[32m    router: PropTypes.object[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  redirectToTarget = (page) => {[m[41m[m
[32m+[m[32m    this.context.router.history.push(`${page}`)[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m  [m
   render() {[m
 [m
     const { classes } = this.props;[m
[36m@@ -181,7 +195,7 @@[m [mclass RecipeReviewCard extends React.Component {[m
     //Check privileges[m
     const checkRole = () => {[m
 [m
[31m-      if(this.state.me){[m
[32m+[m[32m      if(this.state.canEdit){[m[41m[m
         return([m
         <>[m
         <IconButton[m
[36m@@ -227,17 +241,33 @@[m [mclass RecipeReviewCard extends React.Component {[m
       [m
       <Card className={classes.card} >[m
 [m
[31m-        <CardHeader[m
[32m+[m[41m[m
[32m+[m[32m        <CardHeader[m[41m [m
[32m+[m[41m          [m
           avatar={[m
[31m-            <Avatar aria-label="Recipe" className={classes.avatar}>[m
[31m-              {this.state.initial}[m
[31m-            </Avatar>[m
[32m+[m[41m[m
[32m+[m[32m            < div style={{background:'transparent'}}>[m[41m[m
[32m+[m[41m            [m
[32m+[m[32m            <IconButton[m[41m[m
[32m+[m[41m[m
[32m+[m[32m              onClick={() => {[m[41m[m
[32m+[m[32m                this.redirectToTarget(`/profil/${this.state.author}`);[m[41m[m
[32m+[m[32m              }}[m[41m[m
[32m+[m[41m            [m
[32m+[m[32m            >[m[41m[m
[32m+[m[32m              <Avatar aria-label="Recipe" className={classes.avatar}>[m[41m[m
[32m+[m[32m                {this.state.initial}[m[41m[m
[32m+[m[32m              </Avatar>[m[41m[m
[32m+[m[32m            </IconButton>[m[41m[m
[32m+[m[32m            </div>[m[41m[m
           }[m
 [m
           action={checkRole()}[m
           [m
[31m-          title={this.state.title}[m
[32m+[m[32m          title={this.state.author}[m[41m[m
[32m+[m[41m          [m
           subheader={this.state.date}[m
[32m+[m[41m          [m
         />[m
 [m
           <Menu[m
[36m@@ -252,7 +282,12 @@[m [mclass RecipeReviewCard extends React.Component {[m
 [m
         </Menu>[m
       [m
[31m-        <CardContent>[m
[32m+[m[32m        <CardContent style={{marginLeft:'10px'}}>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m        <Typography variant="h6" style={{paddingBottom:'10px'}}>[m[41m[m
[32m+[m[32m          {this.state.title}[m[41m[m
[32m+[m[32m          </Typography>[m[41m[m
[32m+[m[41m[m
           <Typography component="p">[m
           {this.state.description}[m
           </Typography>[m
[36m@@ -374,7 +409,7 @@[m [mclass RecipeReviewCard extends React.Component {[m
         initial : this.props.data.initial,[m
         tags : this.props.data.tags,[m
         language : this.props.data.language,[m
[31m-        me : this.props.data.me,[m
[32m+[m[32m        me : this.props.data.canEdit,[m[41m[m
         firstTime : false,[m
       });[m
 [m
[1mdiff --git a/src/Components/Wall.js b/src/Components/Wall.js[m
[1mdeleted file mode 100644[m
[1mindex 56ef042..0000000[m
[1m--- a/src/Components/Wall.js[m
[1m+++ /dev/null[m
[36m@@ -1,26 +0,0 @@[m
[31m-import React, { Component } from 'react';[m
[31m-[m
[31m-import '../css/wall.css';[m
[31m-[m
[31m-class Wall extends Component {[m
[31m-[m
[31m-  constructor(props) {[m
[31m-    super(props)[m
[31m-    this.state = {[m
[31m-    }[m
[31m-  }[m
[31m-[m
[31m-  render() {[m
[31m-    return ([m
[31m-     <>[m
[31m-     <div className="wall">[m
[31m-[m
[31m-        Wall[m
[31m-[m
[31m-     </div>[m
[31m-     </>[m
[31m-    );[m
[31m-  }[m
[31m-}[m
[31m-[m
[31m-export default Wall;[m
[1mdiff --git a/src/Utils/AuthProvider.js b/src/Utils/AuthProvider.js[m
[1mindex a2de478..61a61bb 100644[m
[1m--- a/src/Utils/AuthProvider.js[m
[1m+++ b/src/Utils/AuthProvider.js[m
[36m@@ -53,7 +53,7 @@[m [mclass AuthProvider extends Component {[m
             console.log(response);[m
             const {token} = response.data;[m
             window.localStorage.setItem('token',token);[m
[31m-            this.setState({user:"connected"});[m
[32m+[m[32m            this.setState({user: username});[m[41m[m
 [m
             /*const {user,token} = response.data;[m
             console.log({user,token})[m
[1mdiff --git a/src/WNS/Content.js b/src/WNS/Content.js[m
[1mindex 189292f..a61c00f 100644[m
[1m--- a/src/WNS/Content.js[m
[1m+++ b/src/WNS/Content.js[m
[36m@@ -7,6 +7,7 @@[m [mimport Avatar from '@material-ui/core/Avatar';[m
 import deepOrange from '@material-ui/core/colors/deepOrange';[m
 import deepPurple from '@material-ui/core/colors/deepPurple';[m
 import Post from '../Components/Post';[m
[32m+[m[32mimport IconButton from '@material-ui/core/IconButton';[m[41m[m
 [m
 const data = [[m
   {[m
[36m@@ -39,15 +40,15 @@[m [mconst styles = theme => ({[m
     height: 'auto',[m
   },[m
   avatar: {[m
[31m-    margin: 10,[m
[32m+[m[32m    //margin: 10,[m[41m[m
   },[m
   orangeAvatar: {[m
[31m-    margin: 10,[m
[32m+[m[32m    //margin: 10,[m[41m[m
     color: '#fff',[m
     backgroundColor: deepOrange[500],[m
   },[m
   purpleAvatar: {[m
[31m-    margin: 10,[m
[32m+[m[32m    //margin: 10,[m[41m[m
     color: '#fff',[m
     backgroundColor: deepPurple[500],[m
   },[m
[36m@@ -82,20 +83,33 @@[m [mclass Content extends React.Component {[m
             <Paper className={classes.paper}>[m
               Following[m
               <Grid container justify="center" alignItems="center">[m
[32m+[m[32m                <IconButton>[m[41m[m
                 <Avatar className={classes.avatar}>H</Avatar>[m
[31m-                <Avatar className={classes.orangeAvatar}>N</Avatar>[m
[32m+[m[32m                </IconButton>[m[41m[m
[32m+[m[32m                <IconButton>[m[41m[m
[32m+[m[32m                   <Avatar className={classes.orangeAvatar}>N</Avatar>[m[41m[m
[32m+[m[32m                   </IconButton>[m[41m[m
[32m+[m[41m               [m
[32m+[m[32m                   <IconButton>[m[41m[m
                 <Avatar className={classes.purpleAvatar}>OP</Avatar>[m
[32m+[m[32m                </IconButton>[m[41m[m
               </Grid>[m
             </Paper>[m
 [m
             <Paper className={classes.paper}>[m
               Followers[m
               <Grid container justify="center" alignItems="center">[m
[31m-                <Avatar className={classes.avatar}>P</Avatar>[m
[31m-                <Avatar className={classes.orangeAvatar}>W</Avatar>[m
[31m-                <Avatar className={classes.purpleAvatar}>IL</Avatar>[m
[31m-                <Avatar className={classes.avatar}>H</Avatar>[m
[31m-                <Avatar className={classes.orangeAvatar}>M</Avatar>[m
[32m+[m[32m              <IconButton>  <Avatar className={classes.avatar}>P</Avatar></IconButton>[m[41m[m
[32m+[m[41m              [m
[32m+[m[32m                <IconButton><Avatar className={classes.orangeAvatar}>W</Avatar></IconButton>[m[41m[m
[32m+[m[41m                [m
[32m+[m[32m                <IconButton>  <Avatar className={classes.purpleAvatar}>IL</Avatar></IconButton>[m[41m[m
[32m+[m[41m              [m
[32m+[m[32m                <IconButton><Avatar className={classes.avatar}>H</Avatar></IconButton>[m[41m[m
[32m+[m[41m                [m
[32m+[m[32m                {/*<IconButton><Avatar className={classes.orangeAvatar}>M</Avatar></IconButton>*/}[m[41m[m
[32m+[m[41m                [m
[32m+[m[41m                [m
               </Grid>[m
             </Paper>[m
 [m
[1mdiff --git a/src/WNS/ContentProfil.js b/src/WNS/ContentProfil.js[m
[1mdeleted file mode 100644[m
[1mindex b355ef7..0000000[m
[1m--- a/src/WNS/ContentProfil.js[m
[1m+++ /dev/null[m
[36m@@ -1,209 +0,0 @@[m
[31m-import React from 'react';[m
[31m-import PropTypes from 'prop-types';[m
[31m-import Typography from '@material-ui/core/Typography';[m
[31m-import Paper from '@material-ui/core/Paper';[m
[31m-import Grid from '@material-ui/core/Grid';[m
[31m-import Button from '@material-ui/core/Button';[m
[31m-import { withStyles } from '@material-ui/core/styles';[m
[31m-import Post from '../Components/Post';[m
[31m-[m
[31m-import CreatePostDialog from '../Components/CreatePostDialog';[m
[31m-import EditPostDialog from '../Components/EditPostDialog';[m
[31m-[m
[31m-[m
[31m-const styles = theme => ({[m
[31m-[m
[31m-  root: {[m
[31m-    flexGrow: 1,[m
[31m-    paddingTop: '20px',[m
[31m-  },[m
[31m-[m
[31m-  profil: {[m
[31m-    ...theme.mixins.gutters(),[m
[31m-    paddingTop: theme.spacing.unit * 2,[m
[31m-    paddingBottom: theme.spacing.unit * 2,[m
[31m-    height: '500px',[m
[31m-    marginTop: '10px',[m
[31m-  },[m
[31m-[m
[31m-  newPost: {[m
[31m-[m
[31m-    marginTop: '10px',[m
[31m-    height: '100px',[m
[31m-    display: 'flex',[m
[31m-  },[m
[31m-[m
[31m-  addBtn: {[m
[31m-[m
[31m-    display: 'flex',[m
[31m-    marginLeft: 'auto',[m
[31m-    marginTop: '60px',[m
[31m-    marginRight: '15px',[m
[31m-    marginBottom: '15px',[m
[31m-  },[m
[31m-[m
[31m-  /*addBtn2 : {[m
[31m-[m
[31m-    display: 'flex',[m
[31m-    marginTop:'60px',[m
[31m-    marginRight:'15px',[m
[31m-    marginBottom:'15px',[m
[31m-  }*/[m
[31m-[m
[31m-});[m
[31m-[m
[31m-[m
[31m-const merde = [[m
[31m-  {[m
[31m-[m
[31m-    id : 0,[m
[31m-    title : "Premier Livre",[m
[31m-    author : "Xavier Vaz Afonso",[m
[31m-    initial: "X",[m
[31m-    description : "Super livre sans description ;)",[m
[31m-    date : "27 December 2018",[m
[31m-    linkPdf : "http://www.orimi.com/pdf-test.pdf",[m
[31m-    like : false,[m
[31m-    tags : ["awesome","funny"],[m
[31m-    language : "English",[m
[31m-    me : true,[m
[31m-  },[m
[31m-][m
[31m-[m
[31m-class Content extends React.Component {[m
[31m-[m
[31m-  constructor(props) {[m
[31m-    super(props)[m
[31m-    this.state = {[m
[31m-      open: false,[m
[31m-      openEdit : false,[m
[31m-      currentEdit : null,[m
[31m-      data : merde,[m
[31m-    }[m
[31m-  }[m
[31m-[m
[31m-  handleChange = name => event => {[m
[31m-    this.setState({[m
[31m-      [name]: event.target.value,[m
[31m-    });[m
[31m-  };[m
[31m-[m
[31m-  //Open Dialog add btn[m
[31m-  handleClickAddBtnOpen = () => {[m
[31m-    this.setState({ open: true });[m
[31m-  };[m
[31m-[m
[31m-[m
[31m-  // Close add dialog[m
[31m-  handleClose = () => {[m
[31m-    this.setState({ open: false });[m
[31m-  };[m
[31m-[m
[31m-  // Close edit dialog[m
[31m-  handleCloseEdit = () => {[m
[31m-    this.setState({ openEdit: false });[m
[31m-    //console.log("CLOSE Edit");[m
[31m-  };[m
[31m-[m
[31m-    // const fd = new FormData();[m
[31m-    //fd.append('pdf',this.state.selectedFile,this.state.selectedFile.name)[m
[31m-[m
[31m-    handleAdd = (val) => {[m
[31m-[m
[31m-      let newArray = this.state.data.slice();    [m
[31m-      newArray.push(val);   [m
[31m-      this.setState({data:newArray})[m
[31m-[m
[31m-      this.handleClose();[m
[31m-    };[m
[31m-[m
[31m-    handleUpdate= (val) => {[m
[31m-[m
[31m-      let arrayCpy = [...this.state.data];[m
[31m-     [m
[31m-      let index = this.state.data.findIndex(e => e.id === val.id);[m
[31m-[m
[31m-      arrayCpy[index] = val;[m
[31m-      this.setState({data : arrayCpy});[m
[31m-[m
[31m-      this.handleCloseEdit();[m
[31m-    };[m
[31m-[m
[31m-    deletePost = (id) => {[m
[31m-[m
[31m-      let filteredArray = this.state.data.filter(element => element.id !== id);[m
[31m-[m
[31m-      return this.setState({[m
[31m-        data: filteredArray[m
[31m-      });[m
[31m-    }[m
[31m-[m
[31m-    editPost = (data) => {[m
[31m-[m
[31m-      this.setState({[m
[31m-        openEdit: true,[m
[31m-        currentEdit: data[m
[31m-      });[m
[31m-    }[m
[31m-[m
[31m-  componentDidMount() {[m
[31m-    window.scrollTo(0, 0)[m
[31m-  };[m
[31m-[m
[31m-  render() {[m
[31m-    const { classes } = this.props;[m
[31m-[m
[31m-    const renderData = this.state.data.map((element) => {[m
[31m-      return (<Post delete = {this.deletePost} key= {element.id} data={element} edit={this.editPost} />)[m
[31m-     });[m
[31m-[m
[31m-    return ([m
[31m-[m
[31m-      <div className={classes.root}>[m
[31m-        <Grid container spacing={24}>[m
[31m-          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>[m
[31m-[m
[31m-            <Paper className={classes.profil} elevation={1}>[m
[31m-              <Typography variant="h5" component="h3">[m
[31m-                Profil[m
[31m-              </Typography>[m
[31m-              <Typography component="p">[m
[31m-                Description[m
[31m-              </Typography>[m
[31m-            </Paper>[m
[31m-[m
[31m-          </Grid>[m
[31m-[m
[31m-          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={6}>[m
[31m-[m
[31m-            <Paper className={classes.newPost}>[m
[31m-[m
[31m-              <Button variant="contained" color="primary" className={classes.addBtn} onClick={this.handleClickAddBtnOpen}>[m
[31m-                Add[m
[31m-               </Button>[m
[31m-[m
[31m-               <CreatePostDialog add = {this.handleAdd} close ={this.handleClose} open={this.state.open}/>[m
[31m-[m
[31m-               <EditPostDialog data = {this.state.currentEdit} update = {this.handleUpdate} close ={this.handleCloseEdit} open={this.state.openEdit}/>[m
[31m-[m
[31m-            </Paper>[m
[31m-[m
[31m-            {renderData}[m
[31m-[m
[31m-          </Grid>[m
[31m-[m
[31m-          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>[m
[31m-[m
[31m-          </Grid>[m
[31m-[m
[31m-        </Grid>[m
[31m-      </div>[m
[31m-    );[m
[31m-  }[m
[31m-}[m
[31m-[m
[31m-Content.propTypes = {[m
[31m-  classes: PropTypes.object.isRequired,[m
[31m-};[m
[31m-[m
[31m-export default withStyles(styles)(Content);[m
\ No newline at end of file[m
[1mdiff --git a/src/WNS/Header.js b/src/WNS/Header.js[m
[1mindex 4c39c5a..197518c 100644[m
[1m--- a/src/WNS/Header.js[m
[1m+++ b/src/WNS/Header.js[m
[36m@@ -150,10 +150,16 @@[m [mclass Header extends React.Component {[m
     router: PropTypes.object[m
   }[m
 [m
[32m+[m[32m  librairy = () => {[m[41m[m
[32m+[m[41m[m
[32m+[m[32m    this.redirectToTarget('/librairy');[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m[m
   redirectToTarget = (page) => {[m
     this.context.router.history.push(`${page}`)[m
   }[m
 [m
[32m+[m[41m[m
   render() {[m
 [m
 [m
[36m@@ -201,7 +207,7 @@[m [mclass Header extends React.Component {[m
                 this.redirectToTarget("/profil");[m
               }}>Profile</MenuItem>[m
 [m
[31m-              <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>[m
[32m+[m[32m              <MenuItem onClick={this.librairy}>Librairy</MenuItem>[m[41m[m
               <MenuItem onClick={signOut}>Logout</MenuItem>[m
             </Menu>[m
           );[m
[36m@@ -247,6 +253,10 @@[m [mclass Header extends React.Component {[m
               <AppBar position="absolute" className={classes.appBar}>[m
                 <Toolbar>[m
 [m
[32m+[m[41m    [m
[32m+[m[41m[m
[32m+[m[41m[m
[32m+[m[32m                  {this.props.home === "true" &&[m[41m[m
                   <Hidden smUp>[m
                     <IconButton[m
                       color="inherit"[m
[36m@@ -256,7 +266,7 @@[m [mclass Header extends React.Component {[m
                     >[m
                       <MenuIcon />[m
                     </IconButton>[m
[31m-                  </Hidden>[m
[32m+[m[32m                  </Hidden>}[m[41m[m
 [m
                   <Typography className={classes.title} variant="h6" color="inherit" noWrap>[m
                     WNS[m
[1mdiff --git a/src/WNS/Home.js b/src/WNS/Home.js[m
[1mindex 2a645a4..fdb5157 100644[m
[1m--- a/src/WNS/Home.js[m
[1m+++ b/src/WNS/Home.js[m
[36m@@ -6,127 +6,22 @@[m [mimport Hidden from '@material-ui/core/Hidden';[m
 import Navigator from './Navigator';[m
 import Content from './Content';[m
 import Header from './Header';[m
[32m+[m[32mimport Paper from '@material-ui/core/Paper';[m[41m[m
[32m+[m[32mimport Grid from '@material-ui/core/Grid';[m[41m[m
[32m+[m[32mimport Avatar from '@material-ui/core/Avatar';[m[41m[m
[32m+[m[32mimport deepOrange from '@material-ui/core/colors/deepOrange';[m[41m[m
[32m+[m[32mimport deepPurple from '@material-ui/core/colors/deepPurple';[m[41m[m
[32m+[m[32mimport Post from '../Components/Post';[m[41m[m
[32m+[m[32mimport IconButton from '@material-ui/core/IconButton';[m[41m[m
 [m
[31m-let theme = createMuiTheme({[m
[31m-  typography: {[m
[31m-    useNextVariants: true,[m
[31m-    h5: {[m
[31m-      fontWeight: 500,[m
[31m-      fontSize: 26,[m
[31m-      letterSpacing: 0.5,[m
[31m-    },[m
[31m-  },[m
[31m-  palette: {[m
[31m-    primary: {[m
[31m-      light: '#63ccff',[m
[31m-      main: '#009be5',[m
[31m-      dark: '#006db3',[m
[31m-    },[m
[31m-  },[m
[31m-  shape: {[m
[31m-    borderRadius: 8,[m
[31m-  },[m
[31m-});[m
[32m+[m[32mconst {theme} = require('../Utils/theme');[m[41m[m
 [m
[31m-theme = {[m
[31m-  ...theme,[m
[31m-  overrides: {[m
[31m-    MuiDrawer: {[m
[31m-      paper: {[m
[31m-        backgroundColor: '#dfe6e9', //#18202c[m
[31m-      },[m
[31m-    },[m
[31m-    MuiButton: {[m
[31m-      label: {[m
[31m-        textTransform: 'initial',[m
[31m-      },[m
[31m-      contained: {[m
[31m-        boxShadow: 'none',[m
[31m-        '&:active': {[m
[31m-          boxShadow: 'none',[m
[31m-        },[m
[31m-      },[m
[31m-    },[m
[31m-    MuiTabs: {[m
[31m-      root: {[m
[31m-        marginLeft: theme.spacing.unit,[m
[31m-      },[m
[31m-      indicator: {[m
[31m-        height: 3,[m
[31m-        borderTopLeftRadius: 3,[m
[31m-        borderTopRightRadius: 3,[m
[31m-        backgroundColor: theme.palette.common.white,[m
[31m-      },[m
[31m-    },[m
[31m-    MuiTab: {[m
[31m-      root: {[m
[31m-        textTransform: 'initial',[m
[31m-        margin: '0 16px',[m
[31m-        minWidth: 0,[m
[31m-        [theme.breakpoints.up('md')]: {[m
[31m-          minWidth: 0,[m
[31m-        },[m
[31m-      },[m
[31m-      labelContainer: {[m
[31m-        padding: 0,[m
[31m-        [theme.breakpoints.up('md')]: {[m
[31m-          padding: 0,[m
[31m-        },[m
[31m-      },[m
[31m-    },[m
[31m-    MuiIconButton: {[m
[31m-      root: {[m
[31m-        padding: theme.spacing.unit,[m
[31m-      },[m
[31m-    },[m
[31m-    MuiTooltip: {[m
[31m-      tooltip: {[m
[31m-        borderRadius: 4,[m
[31m-      },[m
[31m-    },[m
[31m-    MuiDivider: {[m
[31m-      root: {[m
[31m-        backgroundColor: '#404854',[m
[31m-      },[m
[31m-    },[m
[31m-    MuiListItemText: {[m
[31m-      primary: {[m
[31m-        fontWeight: theme.typography.fontWeightMedium,[m
[31m-      },[m
[31m-    },[m
[31m-    MuiListItemIcon: {[m
[31m-      root: {[m
[31m-        color: 'inherit',[m
[31m-        marginRight: 0,[m
[31m-        '& svg': {[m
[31m-          fontSize: 20,[m
[31m-        },[m
[31m-      },[m
[31m-    },[m
[31m-    MuiAvatar: {[m
[31m-      root: {[m
[31m-        width: 32,[m
[31m-        height: 32,[m
[31m-      },[m
[31m-    },[m
[31m-  },[m
[31m-  props: {[m
[31m-    MuiTab: {[m
[31m-      disableRipple: true,[m
[31m-    },[m
[31m-  },[m
[31m-  mixins: {[m
[31m-    ...theme.mixins,[m
[31m-    toolbar: {[m
[31m-      minHeight: 48,[m
[31m-    },[m
[31m-  },[m
[31m-};[m
[32m+[m[32mconst {data} = require('../Utils/dataHome');[m[41m[m
 [m
 const drawerWidthFull = 400;[m
 const drawerWidthMobile = 200;[m
 [m
[31m-const styles = () => ({[m
[32m+[m[32mconst styles  = theme => ({[m[41m[m
   root: {[m
     display: 'flex',[m
     minHeight: '100vh',[m
[36m@@ -144,16 +39,40 @@[m [mconst styles = () => ({[m
   },[m
   mainContent: {[m
     flex: 1,[m
[31m-    padding: '48px 36px 0',[m
[32m+[m[32m    padding: '60px 36px 0',[m[41m[m
     background: '#eaeff1',[m
   },[m
[32m+[m[32m  paper: {[m[41m[m
[32m+[m[32m    padding: theme.spacing.unit * 2,[m[41m[m
[32m+[m[32m    textAlign: 'center',[m[41m[m
[32m+[m[32m    color: theme.palette.text.secondary,[m[41m[m
[32m+[m[32m    marginTop: '10px',[m[41m[m
[32m+[m[32m    height: 'auto',[m[41m[m
[32m+[m[32m  },[m[41m[m
[32m+[m[32m  avatar: {[m[41m[m
[32m+[m[32m    //margin: 10,[m[41m[m
[32m+[m[32m  },[m[41m[m
[32m+[m[32m  orangeAvatar: {[m[41m[m
[32m+[m[32m    //margin: 10,[m[41m[m
[32m+[m[32m    color: '#fff',[m[41m[m
[32m+[m[32m    backgroundColor: deepOrange[500],[m[41m[m
[32m+[m[32m  },[m[41m[m
[32m+[m[32m  purpleAvatar: {[m[41m[m
[32m+[m[32m    //margin: 10,[m[41m[m
[32m+[m[32m    color: '#fff',[m[41m[m
[32m+[m[32m    backgroundColor: deepPurple[500],[m[41m[m
[32m+[m[32m  },[m[41m[m
   [m
 });[m
 [m
 class Home extends React.Component {[m
[31m-  state = {[m
[31m-    mobileOpen: false,[m
[31m-  };[m
[32m+[m[41m[m
[32m+[m[32m  constructor(props) {[m[41m[m
[32m+[m[32m    super(props)[m[41m[m
[32m+[m[32m    this.state = {[m[41m[m
[32m+[m[32m      mobileOpen: false,[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  }[m[41m[m
 [m
   handleDrawerToggle = () => {[m
     this.setState(state => ({ mobileOpen: !state.mobileOpen }));[m
[36m@@ -162,6 +81,10 @@[m [mclass Home extends React.Component {[m
   render() {[m
     const { classes } = this.props;[m
 [m
[32m+[m[32m    const renderData = data.map((element) => {[m[41m[m
[32m+[m[32m      return (<Post key= {element.id} data={element}/>)[m[41m[m
[32m+[m[32m     });[m[41m[m
[32m+[m[41m[m
     return ([m
       <MuiThemeProvider theme={theme}>[m
         <div className={classes.root}>[m
[36m@@ -181,12 +104,54 @@[m [mclass Home extends React.Component {[m
             </Hidden>[m
           </nav>[m
           <div className={classes.appContent}>[m
[31m-            <Header onDrawerToggle={this.handleDrawerToggle} />[m
[32m+[m[32m            <Header home = "true" onDrawerToggle={this.handleDrawerToggle} />[m[41m[m
             [m
             <main className={classes.mainContent}>[m
 [m
               [m
[31m-              <Content />[m
[32m+[m[32m            <Grid container spacing={24}>[m[41m[m
[32m+[m[32m          <Grid item xs={12} lg={8}>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m          {renderData}[m[41m[m
[32m+[m[41m[m
[32m+[m[32m          </Grid>[m[41m[m
[32m+[m[32m          <Grid item xs={12} lg={4}>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m            <Paper className={classes.paper}>[m[41m[m
[32m+[m[32m              Following[m[41m[m
[32m+[m[32m              <Grid container justify="center" alignItems="center">[m[41m[m
[32m+[m[32m                <IconButton>[m[41m[m
[32m+[m[32m                <Avatar className={classes.avatar}>H</Avatar>[m[41m[m
[32m+[m[32m                </IconButton>[m[41m[m
[32m+[m[32m                <IconButton>[m[41m[m
[32m+[m[32m                   <Avatar className={classes.orangeAvatar}>N</Avatar>[m[41m[m
[32m+[m[32m                   </IconButton>[m[41m[m
[32m+[m[41m               [m
[32m+[m[32m                   <IconButton>[m[41m[m
[32m+[m[32m                <Avatar className={classes.purpleAvatar}>OP</Avatar>[m[41m[m
[32m+[m[32m                </IconButton>[m[41m[m
[32m+[m[32m              </Grid>[m[41m[m
[32m+[m[32m            </Paper>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m            <Paper className={classes.paper}>[m[41m[m
[32m+[m[32m              Followers[m[41m[m
[32m+[m[32m              <Grid container justify="center" alignItems="center">[m[41m[m
[32m+[m[32m              <IconButton>  <Avatar className={classes.avatar}>P</Avatar></IconButton>[m[41m[m
[32m+[m[41m              [m
[32m+[m[32m                <IconButton><Avatar className={classes.orangeAvatar}>W</Avatar></IconButton>[m[41m[m
[32m+[m[41m                [m
[32m+[m[32m                <IconButton>  <Avatar className={classes.purpleAvatar}>IL</Avatar></IconButton>[m[41m[m
[32m+[m[41m              [m
[32m+[m[32m                <IconButton><Avatar className={classes.avatar}>H</Avatar></IconButton>[m[41m[m
[32m+[m[41m                [m
[32m+[m[32m                {/*<IconButton><Avatar className={classes.orangeAvatar}>M</Avatar></IconButton>*/}[m[41m[m
[32m+[m[41m                [m
[32m+[m[41m                [m
[32m+[m[32m              </Grid>[m[41m[m
[32m+[m[32m            </Paper>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m          </Grid>[m[41m[m
[32m+[m[32m        </Grid>[m[41m[m
            [m
            [m
             </main>[m
[1mdiff --git a/src/WNS/Profil.js b/src/WNS/Profil.js[m
[1mindex 10f0dff..9331f06 100644[m
[1m--- a/src/WNS/Profil.js[m
[1m+++ b/src/WNS/Profil.js[m
[36m@@ -1,139 +1,26 @@[m
 import React from 'react';[m
 import PropTypes from 'prop-types';[m
[31m-import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';[m
[31m-import CssBaseline from '@material-ui/core/CssBaseline';[m
[31m-import ContentProfil from './ContentProfil';[m
[32m+[m[32mimport { MuiThemeProvider, withStyles } from '@material-ui/core/styles';[m[41m[m
 import Header from './Header';[m
[32m+[m[32mimport Typography from '@material-ui/core/Typography';[m[41m[m
[32m+[m[32mimport Paper from '@material-ui/core/Paper';[m[41m[m
[32m+[m[32mimport Grid from '@material-ui/core/Grid';[m[41m[m
[32m+[m[32mimport Button from '@material-ui/core/Button';[m[41m[m
[32m+[m[32mimport Post from '../Components/Post';[m[41m[m
 [m
[31m-let theme = createMuiTheme({[m
[31m-  typography: {[m
[31m-    useNextVariants: true,[m
[31m-    h5: {[m
[31m-      fontWeight: 500,[m
[31m-      fontSize: 26,[m
[31m-      letterSpacing: 0.5,[m
[31m-    },[m
[31m-  },[m
[31m-  palette: {[m
[31m-    primary: {[m
[31m-      light: '#63ccff',[m
[31m-      main: '#009be5',[m
[31m-      dark: '#006db3',[m
[31m-    },[m
[31m-  },[m
[31m-  shape: {[m
[31m-    borderRadius: 8,[m
[31m-  },[m
[31m-});[m
[32m+[m[32mimport CreatePostDialog from '../Components/CreatePostDialog';[m[41m[m
[32m+[m[32mimport EditPostDialog from '../Components/EditPostDialog';[m[41m[m
 [m
[31m-theme = {[m
[31m-  ...theme,[m
[31m-  overrides: {[m
[31m-    MuiDrawer: {[m
[31m-      paper: {[m
[31m-        backgroundColor: '#dfe6e9', //#18202c[m
[31m-      },[m
[31m-    },[m
[31m-    MuiButton: {[m
[31m-      label: {[m
[31m-        textTransform: 'initial',[m
[31m-      },[m
[31m-      contained: {[m
[31m-        boxShadow: 'none',[m
[31m-        '&:active': {[m
[31m-          boxShadow: 'none',[m
[31m-        },[m
[31m-      },[m
[31m-    },[m
[31m-    MuiTabs: {[m
[31m-      root: {[m
[31m-        marginLeft: theme.spacing.unit,[m
[31m-      },[m
[31m-      indicator: {[m
[31m-        height: 3,[m
[31m-        borderTopLeftRadius: 3,[m
[31m-        borderTopRightRadius: 3,[m
[31m-        backgroundColor: theme.palette.common.white,[m
[31m-      },[m
[31m-    },[m
[31m-    MuiTab: {[m
[31m-      root: {[m
[31m-        textTransform: 'initial',[m
[31m-        margin: '0 16px',[m
[31m-        minWidth: 0,[m
[31m-        [theme.breakpoints.up('md')]: {[m
[31m-          minWidth: 0,[m
[31m-        },[m
[31m-      },[m
[31m-      labelContainer: {[m
[31m-        padding: 0,[m
[31m-        [theme.breakpoints.up('md')]: {[m
[31m-          padding: 0,[m
[31m-        },[m
[31m-      },[m
[31m-    },[m
[31m-    MuiIconButton: {[m
[31m-      root: {[m
[31m-        padding: theme.spacing.unit,[m
[31m-      },[m
[31m-    },[m
[31m-    MuiTooltip: {[m
[31m-      tooltip: {[m
[31m-        borderRadius: 4,[m
[31m-      },[m
[31m-    },[m
[31m-    MuiDivider: {[m
[31m-      root: {[m
[31m-        backgroundColor: '#404854',[m
[31m-      },[m
[31m-    },[m
[31m-    MuiListItemText: {[m
[31m-      primary: {[m
[31m-        fontWeight: theme.typography.fontWeightMedium,[m
[31m-      },[m
[31m-    },[m
[31m-    MuiListItemIcon: {[m
[31m-      root: {[m
[31m-        color: 'inherit',[m
[31m-        marginRight: 0,[m
[31m-        '& svg': {[m
[31m-          fontSize: 20,[m
[31m-        },[m
[31m-      },[m
[31m-    },[m
[31m-    MuiAvatar: {[m
[31m-      root: {[m
[31m-        width: 32,[m
[31m-        height: 32,[m
[31m-      },[m
[31m-    },[m
[31m-  },[m
[31m-  props: {[m
[31m-    MuiTab: {[m
[31m-      disableRipple: true,[m
[31m-    },[m
[31m-  },[m
[31m-  mixins: {[m
[31m-    ...theme.mixins,[m
[31m-    toolbar: {[m
[31m-      minHeight: 48,[m
[31m-    },[m
[31m-  },[m
[31m-};[m
[32m+[m[32mimport ProfilCard from '../Components/ProfilCard';[m[41m[m
 [m
[31m-const drawerWidth = 256;[m
[32m+[m[32mconst {theme} = require('../Utils/theme');[m[41m[m
 [m
[31m-const styles = () => ({[m
[32m+[m[32mconst styles  = theme => ({[m[41m[m
[32m+[m[41m  [m
   root: {[m
     display: 'flex',[m
     minHeight: '100vh',[m
   },[m
[31m-  drawer: {[m
[31m-    [theme.breakpoints.up('sm')]: {[m
[31m-      width: drawerWidth,[m
[31m-      flexShrink: 0,[m
[31m-    },[m
[31m-  },[m
   appContent: {[m
     flex: 1,[m
     display: 'flex',[m
[36m@@ -141,15 +28,119 @@[m [mconst styles = () => ({[m
   },[m
   mainContent: {[m
     flex: 1,[m
[31m-    padding: '48px 36px 0',[m
[32m+[m[32m    padding: '60px 36px 0',[m[41m[m
     background: '#eaeff1',[m
   },[m
[32m+[m[41m[m
[32m+[m[32m  profil: {[m[41m[m
[32m+[m[32m    ...theme.mixins.gutters(),[m[41m[m
[32m+[m[32m    paddingTop: theme.spacing.unit * 2,[m[41m[m
[32m+[m[32m    paddingBottom: theme.spacing.unit * 2,[m[41m[m
[32m+[m[32m    height: '300px',[m[41m[m
[32m+[m[32m    marginTop: '10px',[m[41m[m
[32m+[m[32m  },[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  newPost: {[m[41m[m
[32m+[m[41m[m
[32m+[m[32m    marginTop: '10px',[m[41m[m
[32m+[m[32m    height: '100px',[m[41m[m
[32m+[m[32m    display: 'flex',[m[41m[m
[32m+[m[32m  },[m[41m[m
[32m+[m[41m[m
   [m
[32m+[m[32m  addBtn: {[m[41m[m
[32m+[m[41m[m
[32m+[m[32m    display: 'flex',[m[41m[m
[32m+[m[32m    marginLeft: 'auto',[m[41m[m
[32m+[m[32m    marginTop: '60px',[m[41m[m
[32m+[m[32m    marginRight: '15px',[m[41m[m
[32m+[m[32m    marginBottom: '15px',[m[41m[m
[32m+[m[32m  },[m[41m[m
 });[m
 [m
[32m+[m[41m[m
[32m+[m[32mconst {data} = require('../Utils/dataProfil');[m[41m[m
[32m+[m[41m[m
[32m+[m[41m[m
 class Profil extends React.Component {[m
[31m-  state = {[m
[31m-    mobileOpen: false,[m
[32m+[m[41m[m
[32m+[m[32m  constructor(props) {[m[41m[m
[32m+[m[32m    super(props)[m[41m[m
[32m+[m[32m    this.state = {[m[41m[m
[32m+[m[32m      open: false,[m[41m[m
[32m+[m[32m      openEdit : false,[m[41m[m
[32m+[m[32m      currentEdit : null,[m[41m[m
[32m+[m[32m      data : data,[m[41m[m
[32m+[m[32m      mobileOpen: false,[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[32m  }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  handleChange = name => event => {[m[41m[m
[32m+[m[32m    this.setState({[m[41m[m
[32m+[m[32m      [name]: event.target.value,[m[41m[m
[32m+[m[32m    });[m[41m[m
[32m+[m[32m  };[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  //Open Dialog add btn[m[41m[m
[32m+[m[32m  handleClickAddBtnOpen = () => {[m[41m[m
[32m+[m[32m    this.setState({ open: true });[m[41m[m
[32m+[m[32m  };[m[41m[m
[32m+[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // Close add dialog[m[41m[m
[32m+[m[32m  handleClose = () => {[m[41m[m
[32m+[m[32m    this.setState({ open: false });[m[41m[m
[32m+[m[32m  };[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  // Close edit dialog[m[41m[m
[32m+[m[32m  handleCloseEdit = () => {[m[41m[m
[32m+[m[32m    this.setState({ openEdit: false });[m[41m[m
[32m+[m[32m    //console.log("CLOSE Edit");[m[41m[m
[32m+[m[32m  };[m[41m[m
[32m+[m[41m[m
[32m+[m[32m    // const fd = new FormData();[m[41m[m
[32m+[m[32m    //fd.append('pdf',this.state.selectedFile,this.state.selectedFile.name)[m[41m[m
[32m+[m[41m[m
[32m+[m[32m    handleAdd = (val) => {[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      let newArray = this.state.data.slice();[m[41m    [m
[32m+[m[32m      newArray.push(val);[m[41m   [m
[32m+[m[32m      this.setState({data:newArray})[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      this.handleClose();[m[41m[m
[32m+[m[32m    };[m[41m[m
[32m+[m[41m[m
[32m+[m[32m    handleUpdate= (val) => {[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      let arrayCpy = [...this.state.data];[m[41m[m
[32m+[m[41m     [m
[32m+[m[32m      let index = this.state.data.findIndex(e => e.id === val.id);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      arrayCpy[index] = val;[m[41m[m
[32m+[m[32m      this.setState({data : arrayCpy});[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      this.handleCloseEdit();[m[41m[m
[32m+[m[32m    };[m[41m[m
[32m+[m[41m[m
[32m+[m[32m    deletePost = (id) => {[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      let filteredArray = this.state.data.filter(element => element.id !== id);[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      return this.setState({[m[41m[m
[32m+[m[32m        data: filteredArray[m[41m[m
[32m+[m[32m      });[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m    editPost = (data) => {[m[41m[m
[32m+[m[41m[m
[32m+[m[32m      this.setState({[m[41m[m
[32m+[m[32m        openEdit: true,[m[41m[m
[32m+[m[32m        currentEdit: data[m[41m[m
[32m+[m[32m      });[m[41m[m
[32m+[m[32m    }[m[41m[m
[32m+[m[41m[m
[32m+[m[32m  componentDidMount() {[m[41m[m
[32m+[m[32m    window.scrollTo(0, 0)[m[41m[m
   };[m
 [m
   handleDrawerToggle = () => {[m
[36m@@ -159,20 +150,56 @@[m [mclass Profil extends React.Component {[m
   render() {[m
     const { classes } = this.props;[m
 [m
[32m+[m[32m    const renderData = this.state.data.map((element) => {[m[41m[m
[32m+[m[32m      return (<Post delete = {this.deletePost} key= {element.id} data={element} edit={this.editPost} />)[m[41m[m
[32m+[m[32m     });[m[41m[m
[32m+[m[41m[m
     return ([m
[32m+[m[41m[m
       <MuiThemeProvider theme={theme}>[m
[32m+[m[41m      [m
         <div className={classes.root}>[m
[31m-          <CssBaseline />[m
[32m+[m[41m          [m
[32m+[m[32m          {/*<CssBaseline /> */}[m[41m[m
 [m
           <div className={classes.appContent}>[m
[31m-            <Header onDrawerToggle={this.handleDrawerToggle} />[m
[31m-            [m
[31m-            <main className={classes.mainContent}>[m
[31m-[m
[31m-              [m
[31m-            <ContentProfil />[m
[31m-           [m
[31m-           [m
[32m+[m[32m            <Header home = "false" onDrawerToggle={this.handleDrawerToggle} />[m[41m[m
[32m+[m[32m              <main className={classes.mainContent}>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m              <Grid container spacing={24}>[m[41m[m
[32m+[m[32m          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>[m[41m[m
[32m+[m[41m[m
[32m+[m[41m[m
[32m+[m[32m          <ProfilCard  me="true" username="Xavier"/>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m          </Grid>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={6}>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m            <Paper className={classes.newPost}>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m              <Button variant="contained" color="primary" className={classes.addBtn} onClick={this.handleClickAddBtnOpen}>[m[41m[m
[32m+[m[32m                Add[m[41m[m
[32m+[m[32m               </Button>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m               <CreatePostDialog add = {this.handleAdd} close ={this.handleClose} open={this.state.open}/>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m               <EditPostDialog data = {this.state.currentEdit} update = {this.handleUpdate} close ={this.handleCloseEdit} open={this.state.openEdit}/>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m            </Paper>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m            {renderData}[m[41m[m
[32m+[m[41m[m
[32m+[m[32m          </Grid>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m          <Grid style={{ backgroundColor: 'transparent' }} item xs={12} lg={3}>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m          </Grid>[m[41m[m
[32m+[m[41m[m
[32m+[m[32m        </Grid>[m[41m[m
[32m+[m[41m                [m
[32m+[m[41m[m
[32m+[m[41m[m
             </main>[m
           </div>[m
         </div>[m
