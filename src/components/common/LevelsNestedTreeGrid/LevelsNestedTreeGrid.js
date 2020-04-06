import React, {useState} from 'react';


import {connect} from 'react-redux';
import useStyles from "./styles";
import CustomList from "./CustomList";

import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import TabsContainer from "../Tabs/TabsContainer";

function LevelsNestedTreeGrid(props) {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);

  return (
    <div className={classes.nestedTree}>
      <div className={classes.container} >
        <div className={classes.scrollbar}>
        {
          activeTabId === 0 && (<CustomList data={props.ownerData} depth={0}/>)
        }
        {
          activeTabId === 1 && <CustomList data={props.securData} depth={0}/>
        }
        {
          activeTabId === 2 && <CustomList data={props.otherData} depth={0}/>
        }

        </div>
      </div>

      <TabsContainer
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
        tabs={['Ownr', 'Secur', 'Other']}
      />

      <FullWidthSwitcher widget={"nestedTree"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ownerData: state.patientReducer.ownerData,
    securData: state.patientReducer.securData,
    otherData: state.patientReducer.otherData
  };
};


export default connect(mapStateToProps)(LevelsNestedTreeGrid);