import React from "react";
import useStyles from "./styles";
import 'font-awesome/css/font-awesome.min.css';

function CustomTab(props) {
  const {tabs, activeTabId, setActiveTabId} = props;
  const classes = useStyles();
  const count = tabs.length;

  return (
    <div className={classes.customTabContainer}>
      <i
        className={"fa fa-caret-left"}
        onClick={() => {
          setActiveTabId((activeTabId + count -1) % count)
        }}
      />
      <span>{tabs[activeTabId].toUpperCase()}</span>
      <i
        className={"fa fa-caret-right"}
        onClick={() => {
          setActiveTabId((activeTabId + 1) % count)
        }}
      />
    </div>
  );
}

export default CustomTab;