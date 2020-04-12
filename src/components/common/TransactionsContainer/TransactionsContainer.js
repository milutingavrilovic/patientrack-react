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



  return (
    <div
      className     = {classes.transactionsContainer}
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
              <p className={isExpanded ? classes.headingExpand : classes.heading}>
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
    isLoading: state.patenTrack.isLoading
  };
};

export default connect(mapStateToProps)(TransactionsContainer);