import React, {useState} from 'react';
import { Button, Fade, TextField, Typography } from "@material-ui/core";
import useStyles from "./styles";
import {withRouter} from 'react-router-dom'

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSignIn = () => {
    props.login({
      username,
      password
    })
      .catch(err => {
        setError(err);
      });
  };

  return (
    <div className={classes.loginForm}>
      <Typography
        variant   = "h1"
        className = {classes.greeting}
      >
        Good Morning, User!
      </Typography>
      <Fade in={!!error}>
        <Typography
          color     = "secondary"
          className = {classes.errorMessage}
        >
          Your username and password are not correct!
        </Typography>
      </Fade>
      <TextField
        id          = {"username"}
        value       = {username}
        onChange    = {e => setUsername(e.target.value)}
        InputProps  = {{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          }
        }}
        margin      = "normal"
        placeholder = "UserName"
        type        = "text"
        fullWidth
      />

      <TextField
        id          = "password"
        value       = {password}
        onChange    = {e => setPassword(e.target.value)}
        InputProps  = {{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        margin      = "normal"
        placeholder = "Password"
        type        = "password"
        fullWidth
      />
      <div className={classes.formButtons}>
        <Button
          variant   = "contained"
          color     = "primary"
          size      = "large"
          disabled  = {
            username.length === 0 || password.length === 0
          }
          onClick   = {onSignIn}
        >
          Login
        </Button>
        <Button
          color     = "primary"
          size      = "large"
          className = {classes.forgetButton}
        >
          Forget Password
        </Button>
      </div>
    </div>
  );
}

export default withRouter(Login);