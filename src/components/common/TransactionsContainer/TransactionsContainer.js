import React from 'react';

import {connect} from 'react-redux';
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

function TransactionsContainer(props) {
  const classes = useStyles();

  const getYearString = (yearString) => {
    const curYear = (new Date()).getFullYear();
    const year = Number(yearString);

    console.log(curYear, year);
    if(curYear === year)
      return 'This year';
    if(curYear === year + 1)
      return 'Last year';
    return year;
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.heading}>Transactions</Typography>
      <div className={classes.transactonWrapper}>
      {
        props.transactions
        ?
          props.transactions.map(transaction =>
            <div key={transaction.year} className={classes.typography}>
              <span>{getYearString(transaction.year)}</span>
              <span className={classes.value}>{transaction.count}</span>
            </div>)
        :
          ''
      }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    transactions: state.patientReducer.transactions
  };
};

export default connect(mapStateToProps)(TransactionsContainer);