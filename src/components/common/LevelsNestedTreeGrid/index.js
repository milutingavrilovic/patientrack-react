import React, {useState} from 'react';

import {connect} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useStyles from "./styles";
import CustomList from "./CustomList";

import TabsContainer from "../Tabs";
import FullWidthSwitcher from "../FullWidthSwitcher";
import Loader from "../Loader";
import CustomTab from "../CustomTab";
import { getCustomers, setNestGridTabIndex } from "../../../actions/patenTrackActions";

function LevelsNestedTreeGrid(props) {
  const { nestGridTab, setNestGridTabIndex } = props;
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === "nestedTree";

  const getFontSize = () => {
    if(props.screenHeight < 500 || props.screenWidth < 768)
      return 8;
    if(props.screenHeight < 700 || props.screenWidth < 1200)
      return 14;
    if(props.screenHeight < 900 || props.screenWidth < 1400)
      return 16;
    return 18;
  };

  const renderCustomersData = (data) => {
    if(props.isLoading)
      return <Loader/>;
    return (
      <div className={classes.flexColumn}>
        <span className={isExpanded ? classes.headingExpand : classes.heading} style={{ fontSize: getFontSize() }}>Portfolios</span>
        <CustomList data={data} depth={0} tabId={nestGridTab} parent={[]}/>
      </div>
    );
  };

  return (
    <div
      className     = {classes.nestedTree}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        <div className={classes.context} >
          {
            props.customersData
            ?
              <PerfectScrollbar
                options={{
                  suppressScrollX: true,
                  minScrollbarLength: 30,
                  maxScrollbarLength: 50,
                }}
                className={classes.scrollbar}
              >
                {
                  nestGridTab === 0 && renderCustomersData(props.customersData.employee)
                }
                {
                  nestGridTab === 1 && renderCustomersData(props.customersData.ownership)
                }
                {
                  nestGridTab === 2 && renderCustomersData(props.customersData.security)
                }
                {
                  nestGridTab === 3 && renderCustomersData(props.customersData.other)
                }
              </PerfectScrollbar>
            :
              ''
          }
        </div>
        {
          !isExpanded && (props.screenWidth < 1800 || props.screenHeight < 420)
          ?
            <CustomTab
              activeTabId={nestGridTab}
              setActiveTabId={setNestGridTabIndex}
              tabs={['Emply','Acqu', 'Secur', 'Other']}
            />
          :
            <TabsContainer
              activeTabId={nestGridTab}
              setActiveTabId={setNestGridTabIndex}
              tabs={['Emply', 'Acqu', 'Secur', 'Other']}
            />
        }
      </div>

      <FullWidthSwitcher show={showSwitcher} widget={"nestedTree"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    customersData: state.patenTrack.customersData,
    isLoading: state.patenTrack.customersLoading,
    currentWidget: state.patenTrack.currentWidget,
    screenWidth: state.patenTrack.screenWidth,
    screenHeight: state.patenTrack.screenHeight,
    nestGridTab: state.patenTrack.nestGridTab
  };
};

const mapDispatchToProps = {
  getCustomers,
  setNestGridTabIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsNestedTreeGrid);