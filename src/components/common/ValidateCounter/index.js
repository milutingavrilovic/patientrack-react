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
    if(props.screenHeight < 300 || props.screenWidth < 992)
      return 8;
    if(props.screenHeight < 500 || props.screenWidth < 1200)
      return 10;
    if(props.screenHeight < 700 || props.screenWidth < 1400)
      return 12;
    return 14;
  };

  return (
    <div
      className={classes.validateContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div
        className={classes.container}
        style={{padding: `0 ${getFontSize() * 0.5}px`}}
      >
        {
          props.isLoading
          ?
            <Loader/>
          :
            <div className={isExpanded ? classes.wrapperExpand : classes.wrapper}>
              <div
                className={isExpanded ? classes.titleExpand : classes.title}
                style={{
                  fontSize: getFontSize() * 1.6,
                  padding: `${getFontSize() * 0.5}px 0`
                }}
              >
                Validate Counter
              </div>
              <div
                className={isExpanded ? classes.bodyExpand : classes.body}
                style={{
                  fontSize: getFontSize(),
                  paddingBottom: getFontSize() * 0.5
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
    isLoading: state.patenTrack.isLoading,
    screenHeight: state.patenTrack.screenHeight,
    screenWidth: state.patenTrack.screenWidth
  };
};

const mapDispatchToProps = {
  getValidateCounter
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateCounter);