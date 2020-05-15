import React, {useState} from 'react';

import {connect} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useStyles from "./styles";
import CustomList from "./CustomList";
import CollapsibleTable from "./CollapsibleTable"
import Typography from '@material-ui/core/Typography';
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TabsContainer from "../Tabs";
import FullWidthSwitcher from "../FullWidthSwitcher";
import Loader from "../Loader";
import CustomTab from "../CustomTab";
import { getCustomers, setNestGridTabIndex, getFilterTimeLine,  getCustomersNameCollections, setTimelineTabIndex, getCustomerRFIDAssets, getCollectionIllustration,  setIllustrationUrl,  setCurrentCollectionID,  setCurrentAsset,  getAssetsOutsource,  getAssets,  getComments } from "../../../actions/patenTrackActions";
import { signOut } from "../../../actions/authActions";

function LevelsNestedTreeGrid(props) {
  const { nestGridTab, setNestGridTabIndex } = props;
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === "nestedTree";

  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const [parentCompany, setParentCompany] = useState([]);
  const [parentNode, setParentNode] = useState("");
  const [parentNode1, setParentNode1] = useState("");
  const [parentNode2, setParentNode2] = useState("");

  const getFontSize = () => {
    if(props.screenHeight < 500 || props.screenWidth < 768)
      return 8;
    if(props.screenHeight < 700 || props.screenWidth < 1200)
      return 14;
    if(props.screenHeight < 900 || props.screenWidth < 1400)
      return 16;
    return 18;
  };

  const errorProcess = (err) => {
    if(err !== undefined && err.status === 401 && err.data === 'Authorization error') {
      props.signOut();
      return true;
    }
    return false;
  };

  const handleToggle = (event, nodeIds) => {
    console.log("handleToggle", nodeIds, event, event.target, event.target.nodeName);
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    if(nodeIds != "") {
      const targetEvent = event.currentTarget;
      const selectElement = targetEvent.querySelector('.MuiTreeItem-label');
      if(selectElement != null && selectElement != undefined) {
        const itemText = event.currentTarget.innerText;
        const parentElement = targetEvent.parentNode;
        if(parentElement != null && parentNode != undefined) {
          const level = parentElement.getAttribute('level');
          const tabId = parentElement.getAttribute('tabid');
          switch(parseInt(level)) {
            case 0:
              setParentCompany(itemText);
              setParentNode(nodeIds);
              setParentNode1("");
              setParentNode2("");
              props.getFilterTimeLine( itemText, itemText, 0 ).catch(err => errorProcess({...err}.response));
              if( props.timelineTab == 1 ) {
                props.setTimelineTabIndex(0);
              }
              break;
            case 1:          
              setParentNode1(nodeIds);
              setParentNode2("");    
              console.log("nestGridTab", tabId);
              props.getCustomersNameCollections(itemText, tabId, parentNode, nodeIds).catch(err => errorProcess({...err}.response));
              props.getFilterTimeLine( parentCompany, itemText, 1 ).catch(err => errorProcess({...err}.response));
              if( props.timelineTab == 1 ) {
                props.setTimelineTabIndex(0);
              }
              break;
            case 2: 
              setParentNode2(nodeIds); 
              props.setCurrentCollectionID(itemText);
              props.setCurrentAsset('');  
              props.setIllustrationUrl('about:blank');
              props.getComments('collection', itemText).catch(err => errorProcess({...err}.response));
              props.getCustomerRFIDAssets(itemText, tabId, parentNode, parentNode1, nodeIds).catch(err => errorProcess({...err}.response)); 
              props.getFilterTimeLine( parentCompany, itemText, 3 ).catch(err => errorProcess({...err}.response));              
              props.getCollectionIllustration(itemText).catch(err => errorProcess({...err}.response));
              break;
            case 3: 
              props.setCurrentAsset(itemText);
              props.setCurrentCollectionID('');
              props.setIllustrationUrl('about:blank');
              props.getComments('asset', itemText).catch(err => errorProcess({...err}.response));
              props.getAssetsOutsource(itemText).catch(err => errorProcess({...err}.response));
              props.getAssets(itemText).catch(err => errorProcess({...err}.response));
              props.getFilterTimeLine( parentCompany, itemText, 3 ).catch(err => errorProcess({...err}.response));
              break;            
          }
        }
      }
    }
  };

  const getTreeItemsFromData = treeItems => {
    console.log("treeItems",treeItems);
    return treeItems.map( treeItemData => {
      let children = undefined;
      if (treeItemData.child && treeItemData.child.length > 0) {
        console.log("treeItems1",treeItemData.child);
        children = getTreeItemsFromData(treeItemData.child);
      }
      return (
        <TreeItem  
          key={treeItemData.id}
          nodeId={`${treeItemData.id}`}
          label={treeItemData.name}
          children={children}
          tabid={nestGridTab}
          level={treeItemData.level}
        />
      );
    });
  };

  const DataTreeView = ({ treeItems }) => {
    return (
      <TreeView  
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
       >
        {getTreeItemsFromData(treeItems)}
      </TreeView>
    );
  };
  

  const renderCustomersData = (data) => {
    if(props.isLoading)
      return <Loader/>;
    return (
      <div className={classes.flexColumn}>
        <Typography variant="h2" component="h2" align="center">
          {`Portfolios:12`}
        </Typography> 
        {
          isExpanded 
          ?
          <CollapsibleTable data={data} />
          :
          <DataTreeView treeItems={data} />
        }
        
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
    nestGridTab: state.patenTrack.nestGridTab,
    timelineTab: state.patenTrack.timelineTab,
  };
};

const mapDispatchToProps = {
  getCustomers,
  setNestGridTabIndex,
  getFilterTimeLine,
  getCustomersNameCollections,
  setTimelineTabIndex,
  getCustomerRFIDAssets,
  getCollectionIllustration,
  setIllustrationUrl,
  setCurrentCollectionID,
  setCurrentAsset,
  getAssetsOutsource,
  getAssets,
  getComments,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsNestedTreeGrid);