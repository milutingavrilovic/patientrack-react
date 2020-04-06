import React from "react";
import { Tab, Tabs } from "@material-ui/core";
import useStyles from "./styles";

function TabsContainer(props) {
  const classes = useStyles();
  return (
    <Tabs
      value={props.activeTabId}
      onChange={(e, id) => props.setActiveTabId(id)}
      indicatorColor="primary"
      textColor="primary"
      className={classes.tabs}
    >
      {
        props.tabs && props.tabs.map(
          tab =>
            <Tab
              key={tab}
              label={tab}
              className={classes.tabItem}
            />
            )
      }
    </Tabs>
  );
}

export default TabsContainer;