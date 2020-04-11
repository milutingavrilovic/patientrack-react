import React, {useState} from 'react';
import {connect} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useStyles from "./styles";
import CustomList from "./CustomList";

import TabsContainer from "../Tabs/TabsContainer";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";

function LevelsNestedTreeGrid(props) {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  const [showSwitcher, setShowSwitcher] = useState(0);

  return (
    <div
      className     = {classes.nestedTree}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container} >
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
                activeTabId === 0 && <CustomList data={props.customersData.ownership} depth={0}/>
              }
              {
                activeTabId === 1 && <CustomList data={props.customersData.security} depth={0}/>
              }
              {
                activeTabId === 2 && <CustomList data={props.customersData.other} depth={0}/>
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

      <FullWidthSwitcher show={showSwitcher} widget={"nestedTree"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    customersData: state.patenTrack.customersData
  };
};

export default connect(mapStateToProps)(LevelsNestedTreeGrid);