import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthContext } from '../Utils/AuthProvider';

import { Redirect } from 'react-router-dom';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  a: {
    display: 'flex',
    marginTop: '10px',
  }
});

class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      statusRegister: null,
    }
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {

    return (
      <AuthContext>
        {({ error, user, signUp }) => { // authContext

          if(user) {
              return <Redirect to="/" />;
          }

          const { classes } = this.props;

          const onSubmit = (event) => {
            event.preventDefault();

            let username = this.state.username;
            let password = this.state.password;
            console.log(username);
            console.log(password);

            if (username !== "" && password !== "") {

              return signUp({ username, password }).then((element) => {
                this.setState({ statusRegister: "Account has been successfully registered" })
              }).catch(err => {
              }
              );
            }
          }

          return (
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Email Address</InputLabel>
                    <Input id="username" name="username" autoComplete="email" autoFocus onChange={this.handleInputChange} />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange} />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Confirm Password</InputLabel>
                    <Input name="confirmPassword" type="password" id="confirmPassword" autoComplete="current-password" onChange={this.handleInputChange} />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmit}
                  >
                    Register
                  </Button>
                  <br />
                  <a className={classes.a} href="/login">You already have an account ?</a>
                  <p style={{ color: 'red' }}>{error}</p>
                  <p style={{ color: 'green' }}>{this.state.statusRegister}</p>
                </form>
              </Paper>
            </main>
          );

        }}
      </AuthContext>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);