import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import Loader from "../Loader";
import { getAssetsCount } from "../../../actions/patenTrackActions";

function UpdatedAssests(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'updatedAssets';
  const {today, month, last_month} = props.assetsCount;

  const getFontSize = () => {
    if(props.screenHeight < 500 || props.screenWidth < 992)
      return 8;
    if(props.screenHeight < 600 || props.screenWidth < 1092)
      return 10;
    if(props.screenHeight < 700 || props.screenWidth < 1200)
      return 14;
    if(props.screenHeight < 900 || props.screenWidth < 1400)
      return 16;
    return 18;
  };

  return (
    <div
      className     = {classes.updatedAssetContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div
        className={classes.container}
        style={{minHeight: props.screenHeight/7.5}}
      >
        {
          props.isLoading
            ?
              <Loader/>
            :
              <div
                className={isExpanded ? classes.wrapperExpand : classes.wrapper}
              >
                <table
                  className={ isExpanded ? classes.contextExpand : classes.context}
                  style={{
                    fontSize: isExpanded ? getFontSize() * 2 : getFontSize(),
                  }}
                >
                  <tbody>
                    <tr
                      className={ isExpanded ? classes.headingExpand : classes.heading}
                      style={{
                        fontSize: getFontSize() * 1.3,
                      }}
                    >
                      <td colSpan={2}>Updated Assets</td>
                    </tr>
                    <tr>
                      <td>Today:</td>
                      <td>{today}</td>
                    </tr>
                    <tr>
                      <td>This month:</td>
                      <td>{month}</td>
                    </tr>
                    <tr>
                      <td>Last month:</td>
                      <td>{last_month}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
        }

      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"updatedAssets"}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    assetsCount: state.patenTrack.assetsCount,
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.assetsCountLoading,
    screenHeight: state.patenTrack.screenHeight,
    screenWidth: state.patenTrack.screenWidth
  };
};

const mapDispatchToProps = {
  getAssetsCount
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatedAssests);
