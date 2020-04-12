import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import 'font-awesome/css/font-awesome.min.css';
import Loader from "../Loader/Loader";

function ValidateCounter(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'validateCounter';
  const {valid, application, encumbered} = props.validateCounter;

  return (
    <div
      className={classes.validateContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        {
          props.isLoading
          ?
            <Loader/>
          :
            <div className={isExpanded ? classes.wrapperExpand : classes.wrapper}>
              <div className={isExpanded ? classes.titleExpand : classes.title}>
                Validate Counter
              </div>
              <div className={isExpanded ? classes.bodyExpand : classes.body}>
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
    isLoading: state.patenTrack.isLoading
  };
};

export default connect(mapStateToProps)(ValidateCounter);