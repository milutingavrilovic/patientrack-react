import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import Loader from "../Loader";
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
      className     = {classes.transactionsContainer}
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

              <table className={isExpanded ? classes.contextExpand : classes.context}>
                <tbody>
                  <tr
                    className={isExpanded ? classes.headingExpand : classes.heading}
                    style={{
                      fontSize: getFontSize() * 1.3
                    }}
                  >
                    <td colSpan={2}>Transactions</td>
                  </tr>
                  <tr
                    className={ isExpanded ? classes.typographyExpand : classes.typography}
                    style={{ height: '25%'}}
                  >
                    <td style={{fontSize: isExpanded ? getFontSize() * 2 : getFontSize()}}>Last year</td>
                    <td style={{fontSize: isExpanded ? getFontSize() * 2 : getFontSize()}}>This year</td>
                  </tr>
                  <tr
                    className={ isExpanded ? classes.typographyExpand : classes.typography}
                  >
                    <td style={{fontSize: isExpanded ? getFontSize() * 2 : getFontSize() * 1.5}}>
                      { getYearValue(curYear - 1) }
                    </td>
                    <td style={{fontSize: isExpanded ? getFontSize() * 2 : getFontSize() * 1.5}}>
                      { getYearValue(curYear) }
                    </td>
                  </tr>
                </tbody>
              </table>
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