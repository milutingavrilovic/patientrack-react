import React, { useEffect, useState } from "react";
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

function DashBoard(props) {
  const {authenticated} = props.auth;
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);

  const errorProcess = (err) => {
    if(err !== undefined && err.status === 401 && err.data === 'Authorization error') {
      props.actions.signOut();
      setRedirect(true);
    }
  };

  useEffect(() => {
    props.patentActions.getMessagesCount().catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getAlertsCount().catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCharts('tab1').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCharts('tab2').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCharts('tab3').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getComments('Asset', 7584265).catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getRecordItems(0, 'count').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getRecordItems(0, 'list').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getRecordItems(1, 'count').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getRecordItems(1, 'list').catch(err => {
      errorProcess({...err}.response);
    });
	props.patentActions.getCustomers('employee').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCustomers('ownership').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCustomers('security').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getCustomers('other').catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getTimeLine().catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getTransactions().catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getAssetsCount().catch(err => {
      errorProcess({...err}.response);
    });
    props.patentActions.getValidateCounter().catch(err => {
      errorProcess({...err}.response);
    });

  }, []);

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

  if(!authenticated || redirect)
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