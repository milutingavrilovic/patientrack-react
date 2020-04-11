import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  Grid,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";
import logo from "./logo.svg";
import Login from "./login";
import * as authActions from "../../actions/authActions";

function Auth(props) {
  const classes = useStyles();

  if(props.auth.authenticated)
    return (<Redirect to={"/dashboard"}/>);

  return (
    <Grid
      container
      className={classes.container}
    >
      <div className={classes.logotypeContainer}>
        <img
          src={logo}
          alt="logo"
          className={classes.logotypeImage}
        />
        <Typography className={classes.logotypeText}>
          PatenTrack
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Login login={props.actions.login}/>
        </div>
      </div>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
