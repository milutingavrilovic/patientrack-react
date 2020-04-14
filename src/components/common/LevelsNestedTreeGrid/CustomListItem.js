import React, {useEffect} from 'react';
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
  getAssets
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

  useEffect(() => {
    if(depth === 0)
      props.setTreeOpen(getLabel(depth, props), true);
  }, []);

  return (
    <li className={classes.listItem}>
      <div
        onClick={() => {
          const label = getLabel(depth, props);
          if(depth === 1)
            props.getCustomersNameCollections(label);
          if(depth === 2)
            props.getCustomerRFIDAssets(label);
          if(depth === 3)
          {
            props.setCurrentAsset(label);
            props.getAssetsOutsource(label);
            props.getAssets(label);
          }

          props.setTreeOpen(getLabel(depth, props), !props.isOpened);
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
           <CustomList data={props.child} depth={props.depth + 1}/>
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
        isOpened: state.patenTrack.tree[label] ? state.patenTrack.tree[label] : false
      };
    case 1:
      return {
        ...ownProps,
        child: state.patenTrack.customersNamesCollections[ownProps.name],
        isOpened: state.patenTrack.tree[label] ? state.patenTrack.tree[label] : false
      };
    case 2:
      return {
        ...ownProps,
        child: state.patenTrack.customersRFIDAssets[ownProps.rf_id],
        isOpened: state.patenTrack.tree[label] ? state.patenTrack.tree[label] : false
      };
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
  getAssets
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);