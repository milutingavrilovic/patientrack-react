import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import Loader from "../Loader/Loader";

function UpdatedAssests(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'updatedAssets';
  const {today, month, last_month} = props.assetsCount;

  return (
    <div
      className     = {classes.updatedAssetContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      {
        props.isLoading
        ?
          <div className={classes.container}>
            <Loader/>
          </div>
        :
          <div className={classes.container}>
            <div className={isExpanded ? classes.wrapperExpand : classes.wrapper}>
              <span
                className={ isExpanded ? classes.headingExpand : classes.heading}
              >
                Updated Assets
              </span>
              <div className={ isExpanded ? classes.contextExpand : classes.context}>
                <span>
                  Today: {today}
                </span>
                <span>
                  This month: {month}
                </span>
                <span>
                  Last month: {last_month}
                </span>
              </div>
            </div>
          </div>
      }
      <FullWidthSwitcher show={showSwitcher} widget={"updatedAssets"}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    assetsCount: state.patenTrack.assetsCount,
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.isLoading
  };
};

export default connect(mapStateToProps)(UpdatedAssests);
