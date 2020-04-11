import React from 'react';
import {connect} from 'react-redux';

import {
  List
} from "@material-ui/core";
import CustomListItem from "./CustomListItem";
import useStyle from './styles';

function CustomList(props) {
  const classes = useStyle();

  return (
    <List className={classes.list}>
      {
        props.data && props.data.length
        ?
          props.data.map((item, index) => (
            <CustomListItem
              key     = {index}
              depth   = {props.depth}
              child   = {props.depth===0 ? item.child : props.child}
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
        child: state.patenTrack.customersNamesCollections
      };
    case 2:
      return {
        ...ownProps,
        child: state.patenTrack.customersRFIDAssets
      };
    default:
      return {};
  }
};

export default connect(mapStateToProps)(CustomList);