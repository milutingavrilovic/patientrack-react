import React, {useState} from 'react';
import {connect} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useStyles from "./styles";
import CustomList from "./CustomList";

import TabsContainer from "../Tabs/TabsContainer";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import Loader from "../Loader/Loader";

function LevelsNestedTreeGrid(props) {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === "nestedTree";

  const renderCustomersData = (data) => {
    if(props.isLoading)
      return <Loader/>;
    return (
      <div className={classes.flexColumn}>
        <span className={isExpanded ? classes.headingExpand : classes.heading}>Portfolios</span>
        <CustomList data={data} depth={0}/>
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
                  activeTabId === 0 && renderCustomersData(props.customersData.ownership)
                }
                {
                  activeTabId === 1 && renderCustomersData(props.customersData.security)
                }
                {
                  activeTabId === 2 && renderCustomersData(props.customersData.other)
                }
              </PerfectScrollbar>
            :
              ''
          }
        </div>

        <TabsContainer
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
          tabs={['Ownr', 'Secur', 'Other']}
        />
      </div>

      <FullWidthSwitcher show={showSwitcher} widget={"nestedTree"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    customersData: state.patenTrack.customersData,
    isLoading: state.patenTrack.isLoading,
    currentWidget: state.patenTrack.currentWidget
  };
};

export default connect(mapStateToProps)(LevelsNestedTreeGrid);