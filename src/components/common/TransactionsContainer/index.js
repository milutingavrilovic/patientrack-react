import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import Loader from "../Loader";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getTransactions } from "../../../actions/patenTrackActions";

function TransactionsContainer(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'transactions';
  const curYear = (new Date()).getFullYear();

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

  const getYearValue = (year) => {
    const transaction = props.transactions.find(transaction => +transaction.year === year);
    return transaction ? transaction.count : '';
  };

  return (
    <div
      className     = {`info-box ${classes.transactionsContainer}`}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div
        className={classes.container}
        style={{height: props.screenHeight/7.5}}
      >
        {
          props.isLoading
          ?
            <Loader/>
          :
            <div
              className={isExpanded ? classes.wrapperExpand : classes.wrapper}
            >
              <TableContainer component={Paper}>
                <Table className={`head_box_table `} size="small" aria-label="a dense table">
                  <TableBody>                    
                    <TableRow key={1}>
                      <TableCell align="center" colSpan={2} className={"head_box_heading "}>
                        <Typography variant="h4" component="h4">
                        {`Transaction: 453`}
                        </Typography> 
                      </TableCell>
                    </TableRow>
                    <TableRow key={3}>
                      <TableCell>
                        <Typography variant="h6" component="h6" className={"white"} align="left">
                        {'This year: '}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" component="h6" className={"white"} align="right">
                        {getYearValue(curYear)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow key={2}>
                     <TableCell>
                      <Typography variant="h6" component="h6" className={"white"} align="left">
                        {'Last year: '}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" component="h6" className={"white"} align="right">
                        {getYearValue(curYear - 1)}
                        </Typography>
                      </TableCell>
                    </TableRow>                    
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
        }
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"transactions"}/>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    transactions: state.patenTrack.transactions,
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.transactionsLoading,
    screenHeight: state.patenTrack.screenHeight,
    screenWidth: state.patenTrack.screenWidth
  };
};

const mapDispatchToProps = {
  getTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsContainer);