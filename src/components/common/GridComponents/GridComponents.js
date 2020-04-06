import React from 'react';

import {connect} from 'react-redux';
import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";

function GridComponents(props) {
  const classes = useStyles();

  return (
    <div className={classes.gridComponents}>
      <div className={classes.container}>
        <Typography>Grid Components:</Typography>
        <FullWidthSwitcher widget={"grid-components"}/>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps)(GridComponents);
