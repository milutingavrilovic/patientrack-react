import React, {useEffect, useState} from 'react';
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
} from "../../../actions/patenTrackActions";

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
  const [active, setActive] = useState(false);


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
    }
  };

  const isSelected = () => {
    console.log('isSelected', props.curTree);
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
              props.setCurTreeLevel1(props.tabId, getLabel(depth, props));
              props.setCurTreeLevel2(props.tabId, '');
              props.setCurTreeLevel3(props.tabId, '');
              props.setCurTreeLevel4(props.tabId, '');
              break;
            case 1:
              props.setCurTreeLevel1(props.tabId, props.parent[0]);
              props.setCurTreeLevel2(props.tabId, getLabel(depth, props));
              props.setCurTreeLevel3(props.tabId, '');
              props.setCurTreeLevel4(props.tabId, '');
              break;
            case 2:
              props.setCurTreeLevel1(props.tabId, props.parent[0]);
              props.setCurTreeLevel2(props.tabId, props.parent[1]);
              props.setCurTreeLevel3(props.tabId, getLabel(depth, props));
              props.setCurTreeLevel4(props.tabId, '');
              break;
            case 3:
              props.setCurTreeLevel1(props.tabId, props.parent[0]);
              props.setCurTreeLevel2(props.tabId, props.parent[1]);
              props.setCurTreeLevel3(props.tabId, props.parent[2]);
              props.setCurTreeLevel4(props.tabId, getLabel(depth, props));
              break;
          }
          if(props.isOpened) {
            props.setTreeOpen(getLabel(depth, props), !props.isOpened);
            return;
          }
          props.setTreeOpen(getLabel(depth, props), !props.isOpened);
          const label = getLabel(depth, props);
          if(depth === 0) {
            props.getFilterTimeLine(label,0);
          }
          if(depth === 1) {
            props.getCustomersNameCollections(label);
            props.getFilterTimeLine(label,1);
          }
          if(depth === 2) {
            props.getCustomerRFIDAssets(label);
            props.getFilterTimeLine(label,2);
          }
          if(depth === 3)
          {
            props.setCurrentAsset(label);
            props.getAssetsOutsource(label);
            props.getAssets(label);
            props.getFilterTimeLine(label,3);
          }
        }}
        style={{display: 'flex'}}
      >

        {
          depth !== 3 && (props.isOpened ? <ArrowDropDown/> : <ArrowRight/>)
        }
        <span
          style={{
            paddingLeft: depth === 3 ? '1rem' : 0
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
        isOpened: state.patenTrack.tree[label] ? state.patenTrack.tree[label] : false,
        curTree: state.patenTrack.curTree[ownProps.tabId]
      };
    case 1:
      return {
        ...ownProps,
        child: state.patenTrack.customersNamesCollections[ownProps.name],
        isOpened: state.patenTrack.tree[label] ? state.patenTrack.tree[label] : false,
        curTree: state.patenTrack.curTree[ownProps.tabId]
      };
    case 2:
      return {
        ...ownProps,
        child: state.patenTrack.customersRFIDAssets[ownProps.rf_id],
        isOpened: state.patenTrack.tree[label] ? state.patenTrack.tree[label] : false,
        curTree: state.patenTrack.curTree[ownProps.tabId]
      };
    case 3:
      return {
        ...ownProps,
        curTree: state.patenTrack.curTree[ownProps.tabId]
      }
    default:
      return {};
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);