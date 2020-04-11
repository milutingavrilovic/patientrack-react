import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";

function GridComponents() {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);

  return (
    <div
      className     = {classes.gridComponents}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        <Typography className={classes.typography}>
          Grid Components:
        </Typography>
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"grid-components"}/>
    </div>
  );
}

const mapStateToProps = () => {
  return {

  };
};

export default connect(mapStateToProps)(GridComponents);
