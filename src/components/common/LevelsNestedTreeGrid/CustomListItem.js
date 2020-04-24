import React from 'react';
import {connect} from 'react-redux';
import { ArrowRight, ArrowDropDown } from "@material-ui/icons";
import CustomList from "./CustomList";
import useStyles from "./styles";

import {
  getCustomersNameCollections,
  getCustomerRFIDAssets,
  setTreeOpen,
  setCurrentAsset,
  getAssetsOutsource,
  getAssets,
  getFilterTimeLine,
  setCurTreeLevel1,
  setCurTreeLevel2,
  setCurTreeLevel3,
  setCurTreeLevel4,
  initCurTreeLevel1,
  initCurTreeLevel2,
  initCurTreeLevel3,
  initCurTreeLevel4,
  getComments
} from "../../../actions/patenTrackActions";
import { signOut } from "../../../actions/authActions";

const getLabel = (depth, props) => {
  switch (depth) {
    case 0: case 1:
      return props.name;
    case 2:
      return props.rf_id;
    case 3:
      return props.grant_doc_num ? props.grant_doc_num : props.appno_doc_num;
    default:
      return '';
  }
};


function CustomListItem(props) {
  const {depth} = props;
  const classes = useStyles();

  const errorProcess = (err) => {
    if(err !== undefined && err.status === 401 && err.data === 'Authorization error') {
      props.signOut();
      return true;
    }
    return false;
  };

  const getFontSize = () => {
    if(props.screenHeight < 500 || props.screenWidth < 992)
      return 8;
    if(props.screenHeight < 700 || props.screenWidth < 1200)
      return 12;
    if(props.screenHeight < 900 || props.screenWidth < 1400)
      return 14;
    return 16;
  };

  const getActiveColor = () => {
    switch (depth) {
      case 0:
        return 'red';
      case 1:
        return 'rgb(36, 147, 242)';
      case 2:
        return 'orange';
      case 3:
        return 'green';
      default:
        return '';
    }
  };

  const isSelected = () => {
    const curLabels = Object.values(props.curTree);
    let i;
    for(i = 0; i < props.parent.length; i ++) {
      if(props.parent[i] !== curLabels[i]) {
        return false;
      }
    }
    if(curLabels[i] === getLabel(depth, props))
      return true;
    return false;
  };

  return (
    <li
      className={classes.listItem}
      style={{color: isSelected() ? getActiveColor() : '#bdbdbd'}}
    >
      <div
        onClick={() => {
          switch (depth) {
            case 0:
              isSelected() ?
                props.initCurTreeLevel1(props.tabId)
              :
                props.setCurTreeLevel1(props.tabId, getLabel(depth, props));
              props.setCurTreeLevel2(props.tabId, '');
              props.setCurTreeLevel3(props.tabId, '');
              props.setCurTreeLevel4(props.tabId, '');
              break;
            case 1:
              props.setCurTreeLevel1(props.tabId, props.parent[0]);
              isSelected() ?
                props.initCurTreeLevel2(props.tabId)
              :
                props.setCurTreeLevel2(props.tabId, getLabel(depth, props));
              props.setCurTreeLevel3(props.tabId, '');
              props.setCurTreeLevel4(props.tabId, '');
              break;
            case 2:
              props.setCurTreeLevel1(props.tabId, props.parent[0]);
              props.setCurTreeLevel2(props.tabId, props.parent[1]);
              isSelected() ?
                props.initCurTreeLevel3(props.tabId)
              :
                props.setCurTreeLevel3(props.tabId, getLabel(depth, props));
              props.setCurTreeLevel4(props.tabId, '');

              props.getComments('collection', getLabel(depth, props)).catch(err => errorProcess({...err}.response));
              break;
            case 3:
              props.setCurTreeLevel1(props.tabId, props.parent[0]);
              props.setCurTreeLevel2(props.tabId, props.parent[1]);
              props.setCurTreeLevel3(props.tabId, props.parent[2]);
              isSelected() ?
                props.initCurTreeLevel4(props.tabId)
              :
                props.setCurTreeLevel4(props.tabId, getLabel(depth, props));
              props.getComments('asset', getLabel(depth, props)).catch(err => errorProcess({...err}.response));
              break;
            default:
              break;
          }
          if(props.isOpened) {
            props.setTreeOpen(getLabel(depth, props), !props.isOpened);
            return;
          }
          props.setTreeOpen(getLabel(depth, props), !props.isOpened);
          const label = getLabel(depth, props);
          if(depth === 0) {
            props.getFilterTimeLine(label,0).catch(err => errorProcess({...err}.response));
          }
          if(depth === 1) {
            props.getCustomersNameCollections(label).catch(err => errorProcess({...err}.response));
            props.getFilterTimeLine(label,1).catch(err => errorProcess({...err}.response));
          }
          if(depth === 2) {
            props.getCustomerRFIDAssets(label).catch(err => errorProcess({...err}.response));
            props.getFilterTimeLine(label,2).catch(err => errorProcess({...err}.response));
          }
          if(depth === 3)
          {
            props.setCurrentAsset(label);
            props.getAssetsOutsource(label).catch(err => errorProcess({...err}.response));
            props.getAssets(label).catch(err => errorProcess({...err}.response));
            props.getFilterTimeLine(label,3).catch(err => errorProcess({...err}.response));
          }
        }}
        style={{display: 'flex'}}
      >
        {
          depth !== 3 && (props.isOpened ? <ArrowDropDown/> : <ArrowRight/>)
        }
        <span
          style={{
            paddingLeft: depth === 3 ? '1rem' : 0,
            fontSize: getFontSize()
          }}
        >
          { getLabel(depth, props)}
        </span>
      </div>
      {
         (props.isOpened && props.child)
         ?
           <CustomList
             data={props.child}
             depth={props.depth + 1}
             tabId={props.tabId}
             parent={[...props.parent, getLabel(depth, props)]}/>
         :
           ''
      }
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  const label = getLabel(ownProps.depth, ownProps);

  switch (ownProps.depth) {
    case 0:
      return {
        ...ownProps,
        screenHeight: state.patenTrack.screenHeight,
        screenWidth: state.patenTrack.screenWidth,
        isOpened: state.patenTrack.tree[label] ? state.patenTrack.tree[label] : false,
        curTree: state.patenTrack.curTree[ownProps.tabId]
      };
    case 1:
      return {
        ...ownProps,
        screenHeight: state.patenTrack.screenHeight,
        screenWidth: state.patenTrack.screenWidth,
        child: state.patenTrack.customersNamesCollections[ownProps.name],
        isOpened: state.patenTrack.tree[label] ? state.patenTrack.tree[label] : false,
        curTree: state.patenTrack.curTree[ownProps.tabId]
      };
    case 2:
      return {
        ...ownProps,
        child: state.patenTrack.customersRFIDAssets[ownProps.rf_id],
        isOpened: state.patenTrack.tree[label] ? state.patenTrack.tree[label] : false,
        curTree: state.patenTrack.curTree[ownProps.tabId],
        screenHeight: state.patenTrack.screenHeight,
        screenWidth: state.patenTrack.screenWidth,
      };
    case 3:
      return {
        ...ownProps,
        screenHeight: state.patenTrack.screenHeight,
        screenWidth: state.patenTrack.screenWidth,
        curTree: state.patenTrack.curTree[ownProps.tabId]
      };
    default:
      return {
        screenHeight: state.patenTrack.screenHeight,
        screenWidth: state.patenTrack.screenWidth
      };
  }
};

const mapDispatchToProps =  {
  getCustomersNameCollections,
  getCustomerRFIDAssets,
  getAssetsOutsource,
  setTreeOpen,
  setCurrentAsset,
  getAssets,
  getFilterTimeLine,
  setCurTreeLevel1,
  setCurTreeLevel2,
  setCurTreeLevel3,
  setCurTreeLevel4,
  initCurTreeLevel1,
  initCurTreeLevel2,
  initCurTreeLevel3,
  initCurTreeLevel4,
  getComments,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);