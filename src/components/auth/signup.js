import React, { useState } from "react";
import { Button, Fade, TextField, Typography } from "@material-ui/core";
import useStyles from "./styles";

import { bindActionCreators } from "redux";
import {connect} from 'react-redux';

import * as authActions from '../../actions/authActions';

function SignUp(props) {

  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const onSignUp = () => {
    console.log('sign-up-button', props.actions);
    if(password !== confirmPassword)
      return;
    props.actions.signUp({
      firstName,
      lastName,
      email,
      password
    }).then(res => {
      console.log(res, 'sign up success');
    }).catch(err => {
      setError(err.response.data.error);
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h1" className={classes.greeting}>
        Welcome!
      </Typography>
      <Typography variant="h2" className={classes.subGreeting}>
        Create your account
      </Typography>
      <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
          {error}
        </Typography>
      </Fade>
      <TextField
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        margin="normal"
        placeholder="First Name"
        type="text"
        fullWidth
      />
      <TextField
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        margin="normal"
        placeholder="Last Name"
        type="text"
        fullWidth
      />
      <TextField
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        margin="normal"
        placeholder="Email Adress"
        type="email"
        fullWidth
      />
      <TextField
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      <TextField
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        margin="normal"
        placeholder="Confirm Password"
        type="password"
        fullWidth
      />
      <div className={classes.creatingButtonContainer}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.createAccountButton}
          onClick={onSignUp}
        >
          Create your account
        </Button>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    err: state.authReducer.err
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);