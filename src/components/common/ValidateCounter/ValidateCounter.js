import React from 'react';
import { Typography } from "@material-ui/core";

import {connect} from 'react-redux';
import useStyles from "./styles";

function ValidateCounter(props) {
  const {valid, encumbered, application} = props.validateCounter;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.typography}>
        Valid: {valid && <span>{valid.countValid}</span>}
      </Typography>
      <Typography className={classes.typography}>
        Applicaton: {application && <span>{application.countApplication}</span>}
      </Typography>
      <Typography className={classes.typography}>
        Encumbered: {encumbered && <span>{encumbered.countSecurity}</span>}
      </Typography>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    validateCounter: state.patientReducer.validateCounter
  };
};

export default connect(mapStateToProps)(ValidateCounter);