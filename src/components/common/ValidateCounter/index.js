import React, { useState } from "react";
import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import 'font-awesome/css/font-awesome.min.css';
import Loader from "../Loader";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getValidateCounter } from "../../../actions/patenTrackActions";
import classnames from 'classnames';

function ValidateCounter(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'validateCounter';
  const {valid, application, encumbered} = props.validateCounter;

  return (
    <div
      className={`info-box ${classes.validateContainer}`}
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
            <TableContainer component={Paper}>
              <Table className={`head_box_table  ${classes.table}`} size="small" aria-label="a dense table">
                <TableBody>
                  <TableRow key={1}>
                    <TableCell align="center" colSpan={2}>
                      <Typography variant="h2" component="h2" className={"red"}>
                        {`Assets: 35,465`}
                      </Typography>                      
                    </TableCell>
                  </TableRow>
                  <TableRow key={2}>
                    <TableCell>
                      <Typography variant="h6" component="h6" className={"white"} align="left">
                        {'Valid: '}
                        </Typography>
                      </TableCell>
                    <TableCell>
                      <Typography variant="h6" component="h6" className={"red"} align="right">
                        {valid && valid.countValid}
                        </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow key={3}>
                    <TableCell>
                      <Typography variant="h6" component="h6" className={"white"} align="left">
                      {'Applicaton: '}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" component="h6" className={"red"} align="right">
                      {application && application.countApplication}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow key={4}>
                    <TableCell>
                      <Typography variant="h6" component="h6" className={"white"} align="left">
                      {'Encumbered: '}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" component="h6" className={"red"} align="right">
                      {encumbered && encumbered.countSecurity}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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