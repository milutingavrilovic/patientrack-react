import React, { useEffect, useState, useRef } from "react";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authActions";
import * as patentActions from "../../actions/patenTrackActions";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from "../common/Header";
import useStyles from "./styles";
import { Grid } from '@material-ui/core';

import ValidateCounter from "../common/ValidateCounter";
import LevelsNestedTreeGrid from "../common/LevelsNestedTreeGrid";
import UpdatedAssests from "../common/UpdatedAssests";
import Charts from "../common/Charts";
import TimeLineContainer from "../common/TimeLineContainer";
import FixItemsContainer from "../common/FixItemsContainer";
import RecordItemsContainer from "../common/RecordItemsContainer";
import TransactionsContainer from "../common/TransactionsContainer";
import CommentComponents from "../common/CommentComponents";
import PdfViewer from "../common/PdfViewer";

function DashBoard(props) {
  const {authenticated} = props.auth;
  const classes = useStyles();
  const isMountedRef = useRef(null);

  const errorProcess = (err) => {
    if(err !== undefined && err.status === 401 && err.data === 'Authorization error' && isMountedRef.current) {
      props.actions.signOut();
    }
  };

  useEffect(() => {
    isMountedRef.current = true;

    props.patentActions.getAssetsCount(isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });

    props.patentActions.getMessagesCount().catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getAlertsCount().catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCharts('tab1', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCharts('tab2', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCharts('tab3', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getRecordItems(0, 'count', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getRecordItems(0, 'list', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getRecordItems(1, 'count', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getRecordItems(1, 'list', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCustomers('employee', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCustomers('ownership', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCustomers('security', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCustomers('other', isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getTimeLine(isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getTransactions(isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getAssetsCount(isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getValidateCounter(isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getLawyers(isMountedRef.current).catch(err => {
      errorProcess({...err}.response);
    });

    return () => isMountedRef.current = false;
  });

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
              style={{flexGrow: 1, height: '80%'}}
            >
              <div style={{height: '20%'}}>
                <ValidateCounter/>
              </div>
              <div style={{height: '80%'}}>
                <LevelsNestedTreeGrid/>
              </div>
            </Grid>
            <Grid item style={{ height: '20%'}}>
              <UpdatedAssests/>
            </Grid>
          </Grid>
          <Grid
            className={classes.flexColumn}
            style={{flexGrow: 1}}
          >
            <Grid
              item
              className={classes.flexColumn}
              style={{flexGrow: 1, height: '80%'}}
            >
              <TimeLineContainer/>
            </Grid>
            <Grid container style={{ height: '20%'}}>
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
            <Grid container style={{flexGrow: 1, height: '70%'}} id={"ms23wd"}>
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
              <Grid
                item lg={12} md={12} sm={12} xs={12}
                className={classes.flexColumn}
                style={{position: 'absolute', display:'none'}}
              >
                <PdfViewer/>
              </Grid>
            </Grid>
            <Grid container style={{ height: '30%'}}>
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
    if(currentWidget === 'agreement') {
      return <PdfViewer/>
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
      <Header/>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch),
    patentActions: bindActionCreators(patentActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);