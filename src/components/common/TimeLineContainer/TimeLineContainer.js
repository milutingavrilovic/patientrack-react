import React, { useState } from "react";
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import TabsContainer from "../Tabs/TabsContainer";
import Timeline from 'react-visjs-timeline';
import {connect} from 'react-redux';

function TimeLineContainer(props) {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  const [showSwitcher, setShowSwitcher] = useState(0);

  return (
    <div
      className     = {classes.timeLineContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        {
          activeTabId === 0 &&
          <Timeline
            items={props.timeLine.assignment_assignee ? props.timeLine.assignment_assignee.map(item => {
              return {
                id: item.id,
                content: item.raw_name,
                start: item.exec_dt,
                type: 'box',
                scaleType: 'day'
              }
            }) : []}
          />
        }
        {
          activeTabId === 1 &&
          <Timeline
            items={(props.assets && props.assets.box) ? props.assets.box.map(item => {
              return {
                id: item.id,
                content: item.name,
                start: item.execution_date,
                type: 'box',
                scaleType: 'day'
              }
            }) : []}
          />
        }
        {
          activeTabId === 2 &&
            <div className={classes.outSourceWrapper}>
              <div className={classes.padding}>
                <iframe className={classes.outsource} src={props.assetsOutsource.url} title={props.assetsOutsource.url}/>
              </div>
            </div>
        }
      </div>

      <TabsContainer
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
        tabs={['Time', 'Illust', 'PTO']}
      />
      <FullWidthSwitcher show={showSwitcher} widget={"timeline"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    timeLine: state.patenTrack.timeLine,
    assetsOutsource: state.patenTrack.assetsOutsource,
    assets: state.patenTrack.assets
  };
};

export default connect(mapStateToProps)(TimeLineContainer);