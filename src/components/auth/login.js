import React, {useState} from 'react';
import { Button, Fade, TextField, Typography, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import {withRouter} from 'react-router-dom'

function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSignIn = () => {
    props.actions.login({
      email,
      password
    })
      // .then(res => {
      //   console.log('login in success');
      // })
      // .catch(err => {
      //   console.log('onSignIn', err);
      //   setError(err);
      // });
  };

  return (
    <React.Fragment>
      <Typography variant="h1" className={classes.greeting}>
        Good Morning, User!
      </Typography>
      <Fade in={!!error}>
        <Typography color="secondary" className={classes.errorMessage}>
          Your email and password are not correct!
        </Typography>
      </Fade>
      <TextField
        id={"email"}
        value={email}
        onChange={e => setEmail(e.target.value)}
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          }
        }}
        margin="normal"
        placeholder="Email Adress"
        type="email"
        fullWidth
      />

      <TextField
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        margin="normal"
        placeholder="Password"
        type="password"
        fullWidth
      />
      <div className={classes.formButtons}>
        {
          isLoading
          ?
            <CircularProgress size={26} className={classes.loginLoader} />
          :
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={
                email.length === 0 || password.length === 0
              }
              onClick={onSignIn}
            >
              Login
            </Button>
        }
        <Button
          color="primary"
          size="large"
          className={classes.forgetButton}
        >
          Forget Password
        </Button>
      </div>
    </React.Fragment>
  );
}

export default withRouter(Login);