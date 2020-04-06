import React from 'react';
import {connect} from 'react-redux';
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import {
  Grid
} from "@material-ui/core";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";

function FixItemsContainer(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Typography varient="h1" className={classes.header}>
          Fix it:
          <span className={classes.itemsCount}>{props.fixItemCount}</span>
        </Typography>
        <div>
          {
            props.fixItemList.length && props.fixItemList.map(item => {
              return (
                <div key={item.id}>
                  <Grid container className={classes.gridItem}>
                    <Grid item lg={4}>
                      Asset:
                    </Grid>
                    <Grid item lg={8} className={classes.value}>
                      <span>{item.asset}</span>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem}>
                    <Grid item lg={4}>
                      LawyerId:
                    </Grid>
                    <Grid item lg={8} className={classes.value}>
                      <span >{item.lawyer_id}</span>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem}>
                    <Grid item lg={4}>
                      Created at:
                    </Grid>
                    <Grid item lg={8} className={classes.value}>
                      <span >{item.created_at}</span>
                    </Grid>
                  </Grid>

                  <Typography className={classes.typography}>Company Data</Typography>
                  <Grid container className={classes.gridItem}>
                    <Grid item lg={4}>
                      Email:
                    </Grid>
                    <Grid item lg={8} className={classes.value}>
                      <span >{item.company_lawyer.email_address}</span>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem}>
                    <Grid item lg={4}>
                      Name:
                    </Grid>
                    <Grid item lg={8} className={classes.value}>
                      <span >{item.company_lawyer.first_name + item.company_lawyer.last_name}</span>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.gridItem}>
                    <Grid item lg={4}>
                      Telephone:
                    </Grid>
                    <Grid item lg={8} className={classes.value}>
                      <span >{item.company_lawyer.telephone}</span>
                    </Grid>
                  </Grid>
                </div>
              )
            })
          }
        </div>
        <FullWidthSwitcher widget={"fixItems"}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    fixItemCount: state.patientReducer.fixItemCount,
    fixItemList: state.patientReducer.fixItemList
  };
};

export default connect(mapStateToProps)(FixItemsContainer);