import React, { useState, useEffect } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';

import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import TabsContainer from "../Tabs";
import {connect} from 'react-redux';
import { getAssetsOutsource, getTimeLine } from "../../../actions/patenTrackActions";
import 'font-awesome/css/font-awesome.min.css';
import classnames from 'classnames';

import modifyingData from './TimeLine';
import assignmentTimeline from "./TimeLine1";

function TimeLineContainer(props) {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  const [showSwitcher, setShowSwitcher] = useState(0);

  useEffect(() => {
    const iframe = document.getElementById("outsource");
    if(activeTabId === 1 && iframe) {
      // iframe.contentWindow.renderData(props.assets);
    }
  }, [props.assets]);

  useEffect(() => {
    if(activeTabId === 0 && props.timeLine.assignees) {
      const passingData = modifyingData(props.timeLine);
      assignmentTimeline(
        passingData.groups,
        passingData.groups3,
        passingData.items1,
        passingData.items2,
        passingData.items3,
        passingData.itemDates);
    }
  }, [props.timeLine, activeTabId]);

  return (
    <div
      className     = {classes.timeLineContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.timeLineWrapper}>
        <div className={classes.container}>
          {
            activeTabId === 0 &&
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
            <div
              className={classes.outSourceWrapper}
              style={{display: activeTabId === 1 ? 'initial' : 'none'}}
            >
              <div className={classes.padding}>
                <iframe id={"outsource"} className={classes.outsource} src='./d3/index.html'/>
              </div>
            </div>
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
        <div style={{marginBottom: 5}}>
          <TabsContainer
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
            tabs={['Time', 'Illust', 'PTO']}
          />
        </div>
      </div>
      <FullWidthSwitcher
        show={showSwitcher}
        widget={ activeTabId === 1 ? "charts" : "timeline"}
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
    isLoading: state.patenTrack.isLoading
  };
};

const mapDispatchToProps = {
  getAssetsOutsource,
  getTimeLine
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeLineContainer);