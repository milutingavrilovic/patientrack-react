import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";

function ValidateCounter(props) {
  const {valid, encumbered, application} = props.validateCounter;
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'validateCounter';

  return (
    <div
      className={classes.validateContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        <div>
          <div
            className={isExpanded ? classes.titleExpand : classes.title}
          >
            Validate Counter
          </div>
          <div
            className={isExpanded ? classes.bodyExpand : classes.body}
          >
            <div>
              <span>{'Valid: '}</span>
              {valid && <span className={classes.value}>{valid.countValid}</span>}
            </div>
            <div>
              <span>{'Applicaton: '}</span>
              {application && <span className={classes.value}>{application.countApplication}</span>}
            </div>
            <div>
              <span>{'Encumbered: '}</span>
              {encumbered && <span className={classes.value}>{encumbered.countSecurity}</span>}
            </div>
          </div>
        </div>
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"validateCounter"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    validateCounter: state.patenTrack.validateCounter,
    currentWidget: state.patenTrack.currentWidget
  };
};

export default connect(mapStateToProps)(ValidateCounter);