import React from 'react';
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authActions";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from "../common/Header/Header";
import useStyles from "./styles";
import {
  Grid
} from '@material-ui/core';

import ValidateCounter from "../common/ValidateCounter/ValidateCounter";
import LevelsNestedTreeGrid from "../common/LevelsNestedTreeGrid/LevelsNestedTreeGrid";
import UpdatedAssests from "../common/UpdatedAssests/UpdatedAssets";
import Charts from "../common/Charts/Charts";
import TimeLineContainer from "../common/TimeLineContainer/TimeLineContainer";
import FixItemsContainer from "../common/FixItemsContainer/FixItemsContainer";
import RecordItemsContainer from "../common/RecordItemsContainer/RecordItemsContainer";
import TransactionsContainer from "../common/TransactionsContainer/TransactionsContainer";
import CommentComponents from "../common/CommentComponents/CommentComponents";

function DashBoard(props) {
  const {authenticated} = props.auth;
  const {signOut} = props.actions;
  const classes = useStyles();

  const renderContext = () => {
    const {currentWidget} = props;
    if(currentWidget === 'all') {
      return (
        <Grid
          container
          className={classes.dashboard}
        >
          <Grid
            item lg={2} md={2} sm={2} xs={2}
            className={classes.flexColumn}
          >
            <Grid
              item
              className={classes.flexColumn}
              style={{flexGrow: 1}}
            >
              <div>
                <ValidateCounter/>
              </div>
              <LevelsNestedTreeGrid/>
            </Grid>
            <Grid item>
              <UpdatedAssests/>
            </Grid>
          </Grid>
          <Grid
            className={classes.flexColumn}
            style={{flexGrow: 1}}
          >
            <TimeLineContainer/>
            <Grid container>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <TransactionsContainer/>
              </Grid>
              <Grid
                item lg={9} md={9} sm={9} xs={9}
                className={classes.flexColumn}
              >
                <CommentComponents/>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className={classes.flexColumn}
            style={{width: '28.5%'}}
          >
            <Grid container style={{flexGrow: 1}}>
              <Grid
                item lg={6} md={6} sm={6} xs={6}
                className={classes.flexColumn}
              >
                <FixItemsContainer/>
              </Grid>
              <Grid
                item lg={6} md={6} sm={6} xs={6}
                className={classes.flexColumn}
              >
                <RecordItemsContainer/>
              </Grid>
            </Grid>
            <Grid container>
              <Charts/>
            </Grid>
          </Grid>
        </Grid>
      )
    }
    if(currentWidget === 'nestedTree') {
      return <LevelsNestedTreeGrid/>
    }
    if(currentWidget === 'fixItems') {
      return <FixItemsContainer/>
    }
    if(currentWidget === 'recordItems') {
      return <RecordItemsContainer/>
    }
    if(currentWidget === 'charts') {
      return <Charts/>
    }
    if(currentWidget === 'timeline') {
      return <TimeLineContainer/>
    }
    if(currentWidget === 'comments') {
      return <CommentComponents/>
    }
    if(currentWidget === 'validateCounter') {
      return <ValidateCounter/>
    }
    if(currentWidget === 'updatedAssets') {
      return <UpdatedAssests/>
    }
    if(currentWidget === 'transactions') {
      return <TransactionsContainer/>
    }
  };

  if(!authenticated)
    return (<Redirect to={"/"}/>);

  return (
    <Grid
      container
      className={classes.container}
      style={{
        height: props.screenHeight
      }}
    >
      <Header
        user                = {props.auth.profile ? props.auth.profile.user : {}}
        signOut             = {signOut}
        messagesCount       = {props.messagesCount}
        alertsCount         = {props.alertsCount}
        width               = {props.screenWidth}
        height              = {props.screenHeight}
      />
      <Grid
        container
        className={classes.dashboardContainer}
      >
        {renderContext()}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentWidget: state.patenTrack.currentWidget,
    screenHeight: state.patenTrack.screenHeight,
    screenWidth: state.patenTrack.screenWidth,
    messagesCount: state.patenTrack.messagesCount,
    alertsCount: state.patenTrack.alertsCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);