import React from 'react';
import useStyles from "./styles";
import 'font-awesome/css/font-awesome.min.css';

function Loader(props) {
  const classes = useStyles();

  return (
    <div className={classes.loaderContainer}>
      <i className={"fa fa-spin fa-circle-o-notch"}/>
    </div>
  )
};

export default Loader;