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
import GridComponents from "../common/GridComponents/GridComponents";

function DashBoard(props) {
  const {user, authenticated} = props.auth;
  const {signOut} = props.actions;
  const classes = useStyles();

  const renderContext = () => {
    const {currentWidget} = props;
    if(currentWidget === 'all') {
      return <Grid container className={classes.dashboard}>
        <Grid item lg={2} md={4} sm={12} xs={12} className={classes.flexColumn}>
          <Grid item className={classes.flexColumn} style={{flexGrow: 1}}>
            <ValidateCounter/>
            <LevelsNestedTreeGrid/>
          </Grid>
          <Grid item>
            <UpdatedAssests/>
          </Grid>
        </Grid>
        <Grid item lg={7} md={8} sm={12} xs={12} className={classes.flexColumn}>
          <TimeLineContainer/>
          <Grid container>
            <Grid item lg={3} md={3} sm={3} xs={12}>
              <TransactionsContainer/>
            </Grid>
            <Grid item lg={9} md={9} sm={9} xs={12} className={classes.flexColumn}>
              <GridComponents/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={12} sm={12} xs={12} className={classes.flexColumn}>
          <Grid container style={{flexGrow: 1}}>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.flexColumn}>
              <FixItemsContainer/>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.flexColumn}>
              <RecordItemsContainer/>
            </Grid>
          </Grid>
          <Grid container>
            <Charts/>
          </Grid>
        </Grid>
      </Grid>
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
    if(currentWidget === 'grid-components') {
      return <GridComponents/>
    }
  };

  if(!authenticated)
    return (<Redirect to={"/"}/>);
  return (
    <Grid
      container
      className={classes.container}
      style={{height: (props.screenHeight ? props.screenHeight + 10 : 0)}}>
      <Header
        user={user}
        signOut={signOut}
        messagesCount={props.messagesCount}
        notificationsCount={props.notificationsCount}
      />
      <Grid container className={classes.dashboardContainer}>
        {renderContext()}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    currentWidget: state.patientReducer.currentWidget,
    screenHeight: state.patientReducer.screenHeight,
    messagesCount: state.patientReducer.messagesCount,
    notificationsCount: state.patientReducer.notificationsCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);