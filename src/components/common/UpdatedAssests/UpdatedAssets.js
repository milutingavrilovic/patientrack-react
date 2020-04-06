import React from 'react';

import {connect} from 'react-redux';
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

function UpdatedAssests(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.heading}>UpdatedAssets:</Typography>
      <Typography className={classes.typography}>Today: 3</Typography>
      <Typography className={classes.typography}>This month: 12</Typography>
      <Typography className={classes.typography}>Last month: 45</Typography>
    </div>
  );
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps)(UpdatedAssests);
