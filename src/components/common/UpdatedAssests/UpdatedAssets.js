import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";

function UpdatedAssests(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'updatedAssets';

  return (
    <div
      className     = {classes.updatedAssetContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        <span
          className={ isExpanded ? classes.headingExpand : classes.heading}
        >
          Updated Assets
        </span>
        <div className={ isExpanded ? classes.contextExpand : classes.context}>
          <span>
            Today: {props.assetsCount.today}
          </span>
          <span>
            This month: {props.assetsCount.month}
          </span>
          <span>
            Last month: {props.assetsCount.last_month}
          </span>
        </div>
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"updatedAssets"}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    assetsCount: state.patenTrack.assetsCount,
    currentWidget: state.patenTrack.currentWidget
  };
};

export default connect(mapStateToProps)(UpdatedAssests);
