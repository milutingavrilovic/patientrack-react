import React, { useState } from "react";
import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import 'font-awesome/css/font-awesome.min.css';
import Loader from "../Loader";
import { getValidateCounter } from "../../../actions/patenTrackActions";

function ValidateCounter(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'validateCounter';
  const {valid, application, encumbered} = props.validateCounter;

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
      className={classes.validateContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div
        className={classes.container}
      >
        {
          props.isLoading
          ?
            <Loader/>
          :
            <div className={isExpanded ? classes.wrapperExpand : classes.wrapper}>
              <div
                className={isExpanded ? classes.bodyExpand : classes.body}
                style={{
                  fontSize: getFontSize(),
                }}
              >
                <div>
                  <span>{'Valid: '}</span>
                  <span className={classes.value}>
                    {valid && valid.countValid}
                  </span>
                </div>
                <div>
                  <span>{'Applicaton: '}</span>
                  <span className={classes.value}>
                    {application && application.countApplication}
                  </span>
                </div>
                <div>
                  <span>{'Encumbered: '}</span>
                  <span className={classes.value}>
                    {encumbered && encumbered.countSecurity}
                  </span>
                </div>
              </div>
            </div>
        }
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"validateCounter"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    validateCounter: state.patenTrack.validateCounter,
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.validateCounterLoading,
    screenHeight: state.patenTrack.screenHeight,
    screenWidth: state.patenTrack.screenWidth
  };
};

const mapDispatchToProps = {
  getValidateCounter
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateCounter);