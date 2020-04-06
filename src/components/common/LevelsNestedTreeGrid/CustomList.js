import React from 'react';

import {
  List
} from "@material-ui/core";
import CustomListItem from "./CustomListItem";

import {connect} from 'react-redux';

function CustomList(props) {
  return (
    <List style={{height: '100%'}}>
      {
        props.data !== undefined && props.data.length
        ?
          props.data.map((item, index) => (
            <CustomListItem
              key={index}
              depth={props.depth}
              child={props.depth===0 ? item.child : props.child}
              {...item}
            />
          ))
        :
          ''
      }
    </List>
  )
}

const mapStateToProps = (state, ownProps) => {
  switch (ownProps.depth) {
    case 0:
      return ownProps;
    case 1:
      return {
        ...ownProps,
        child: state.patientReducer.customersNamesCollections
      };
    case 2:
      return {
        ...ownProps,
        child: state.patientReducer.customersRFIDAssets
      };
    default:
      return {};
  }
};

export default connect(mapStateToProps)(CustomList);