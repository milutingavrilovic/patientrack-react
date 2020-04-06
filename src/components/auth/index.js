import React, { useState } from 'react';

import {
  Grid,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";

import { Redirect } from "react-router-dom";

import useStyles from "./styles";
import logo from "./logo.svg";
import SignUp from "./signup";
import Login from "./login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authActions";

function Auth(props) {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  if(props.auth.authenticated)
    return (<Redirect to={"/dashboard"}/>);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Patient Track</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="Sign up" classes={{ root: classes.tab }} />
          </Tabs>
          {
            activeTabId === 0
            ?
              <Login actions={props.actions}/>
            :
              <SignUp/>
          }
        </div>
      </div>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
