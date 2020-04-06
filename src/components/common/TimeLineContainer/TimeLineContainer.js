import React, { useState } from "react";
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import TabsContainer from "../Tabs/TabsContainer";
import Timeline from 'react-visjs-timeline'

import {connect} from 'react-redux';

const options = {
  width: '100%',
  height: '60px',
  stack: false,
  showMinorLabels: true,
  showCurrentTime: true,
  zoomMin: 10,
  type: 'background',
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
};

function TimeLineContainer(props) {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  const items = props.timeLine.assignment_assignors.map(item => {
    const startDate = new Date(item.exec_dt);
    return {
      start: startDate,
      end: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1),
      content: item.raw_name
    };
  });

  console.log('timeline', items);

  return (
    <div className={classes.timeLineContainer}>
      <div className={classes.container}>
        <Timeline
          options={options}
          items={items}
        />
      </div>

      <i className={"fa fa-user"}/>

      <TabsContainer
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
        tabs={['Time', 'Illust', 'PTO']}
      />
      <FullWidthSwitcher widget={"timeline"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    timeLine: state.patientReducer.timeLine
  };
};

export default connect(mapStateToProps)(TimeLineContainer);