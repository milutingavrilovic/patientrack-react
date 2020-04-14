import React, { useState, useEffect } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';

import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import TabsContainer from "../Tabs";
import {connect} from 'react-redux';
import { getAssetsOutsource, getTimeLine, setTimelineTabIndex } from "../../../actions/patenTrackActions";
import 'font-awesome/css/font-awesome.min.css';
import classnames from 'classnames';

import modifyingData from './TimeLine';
import assignmentTimeline from "./TimeLine1";

function TimeLineContainer(props) {
  const { timelineTab, setTimelineTabIndex } = props;
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);

  useEffect(() => {
    const iframe = document.getElementById("outsource");
    if(timelineTab === 1 && iframe) {
      // iframe.contentWindow.renderData(props.assets);
    }
  }, [props.assets]);

  useEffect(() => {
    if(timelineTab === 0 && props.timeLine.assignees) {
      const passingData = modifyingData(props.timeLine);
      assignmentTimeline(
        passingData.groups,
        passingData.groups3,
        passingData.items1,
        passingData.items2,
        passingData.items3,
        passingData.itemDates);
    }
  }, [props.timeLine, timelineTab]);

  return (
    <div
      className     = {classes.timeLineContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.timeLineWrapper}>
        <div className={classes.container}>
          {
            timelineTab === 0 &&
            <div style={{position: 'relative', height: '100%'}}>
              <PerfectScrollbar
                options={{
                  suppressScrollX: true,
                  minScrollbarLength: 30,
                  maxScrollbarLength: 50,
                }}
                className={classes.scrollbar}
                id={"timeline"}
              >
              </PerfectScrollbar>
              <div className={classes.btnGroups}>
                <i className={classnames("fa fa-minus", classes.button)} id={"zoomIn"}/>
                <i className={classnames("fa fa-plus", classes.button)} id={"zoomOut"}/>
              </div>
            </div>
          }
          {
            timelineTab === 1 &&
            <div
              className={classes.outSourceWrapper}
            >
              <div className={classes.padding}>
                <iframe id={"outsource"} className={classes.outsource} src='./d3/index.html'/>
              </div>
            </div>
          }
          {
            timelineTab === 2 &&
            <div className={classes.outSourceWrapper}>
              <div className={classes.padding}>
                <iframe className={classes.outsource} src={props.assetsOutsource.url} title={props.assetsOutsource.url}/>
              </div>
            </div>
          }
        </div>
        <div style={{marginBottom: 5}}>
          <TabsContainer
            activeTabId={timelineTab}
            setActiveTabId={setTimelineTabIndex}
            tabs={['Time', 'Illust', 'PTO']}
          />
        </div>
      </div>
      <FullWidthSwitcher
        show={showSwitcher}
        widget="timeline"
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    timeLine: state.patenTrack.timeLine,
    assetsOutsource: state.patenTrack.assetsOutsource,
    assets: state.patenTrack.assets,
    currentAsset: state.patenTrack.currentAsset,
    isLoading: state.patenTrack.isLoading,
    timelineTab: state.patenTrack.timelineTab
  };
};

const mapDispatchToProps = {
  getAssetsOutsource,
  getTimeLine,
  setTimelineTabIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeLineContainer);