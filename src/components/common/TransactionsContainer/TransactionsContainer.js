import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import Loader from "../Loader/Loader";

function TransactionsContainer(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'transactions';

  const getYearString = (yearString) => {
    const curYear = (new Date()).getFullYear();
    const year = Number(yearString);

    if(curYear === year)
      return 'This year';
    if(curYear === year + 1)
      return 'Last year';
    return year;
  };

  const getFontSize = () => {
    if(props.screenHeight < 300 || props.screenWidth < 768)
      return 8;
    if(props.screenHeight < 500 || props.screenWidth < 1200)
      return 10;
    if(props.screenHeight < 700 || props.screenWidth < 1400)
      return 12;
    return 14;
  };

  return (
    <div
      className     = {classes.transactionsContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div
        className={classes.container}
        style={{height: props.screenHeight/7}}
      >
        {
          props.isLoading
          ?
            <Loader/>
          :
            <div
              className={isExpanded ? classes.wrapperExpand : classes.wrapper}
              style={{fontSize: getFontSize()}}
            >
              <p
                className={isExpanded ? classes.headingExpand : classes.heading}
                style={{fontSize: getFontSize() * 1.2}}
              >
                Transactions
              </p>
              <div className={isExpanded ? classes.contextExpand : classes.context}>
                {
                  props.transactions
                    ?
                    props.transactions.map(transaction =>
                      <div
                        key={transaction.year}
                        className={ isExpanded ? classes.typographyExpand : classes.typography}
                        style={{ padding: props.screenHeight > 700 ? '0.5rem' : '0rem'}}
                      >
                        <span>{getYearString(transaction.year) + ':'}</span>
                        <span>{transaction.count}</span>
                      </div>)
                    :
                    ''
                }
              </div>
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
    isLoading: state.patenTrack.isLoading,
    screenHeight: state.patenTrack.screenHeight,
    screenWidth: state.patenTrack.screenWidth
  };
};

export default connect(mapStateToProps)(TransactionsContainer);