import React, {useState} from 'react';
import {connect} from 'react-redux';

import { ListItem } from "@material-ui/core";

import { ArrowRight, ArrowDropDown } from "@material-ui/icons";
import CustomList from "./CustomList";
import useStyles from "./styles";

import {getCustomersNameCollections, getCustomerRFIDAssets} from "../../../actions/patenTrackActions";

function CustomListItem(props) {
  const {depth} = props;
  const [isOpened, setOpened] = useState(depth === 0);
  const classes = useStyles();

  const getLabel = () => {
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

  return (
    <ListItem className={classes.listItem}>
      <div
        onClick={() => {
          setOpened(!isOpened);
        }}
        style={{display: 'flex'}}
      >

        {
          props.child && (isOpened ? <ArrowDropDown/> : <ArrowRight/>)
        }
        <span
          style={{
            paddingLeft: depth === 3 ? '0.8rem' : 0
          }}
        >
          { getLabel()}
        </span>
      </div>
      {
         (isOpened && props.child)
         ?
           <CustomList data={props.child} depth={props.depth + 1}/>
         :
           ''
      }
    </ListItem>
  )
}

const mapStateToProps = (state, ownProps) => {
  switch (ownProps.depth) {
    case 0:
      return ownProps;
    case 1:
      return {
        ...ownProps,
        child: state.patenTrack.customersNamesCollections[ownProps.name]
      };
    case 2:
      return {
        ...ownProps,
        child: state.patenTrack.customersRFIDAssets[ownProps.rf_id]
      };
    default:
      return {};
  }
};

const mapDispatchToProps =  {
  getCustomersNameCollections,
  getCustomerRFIDAssets
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);