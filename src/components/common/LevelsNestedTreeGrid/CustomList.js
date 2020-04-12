import React from 'react';

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
              {...item}
            />
          ))
        :
          ''
      }
    </List>
  )
}

export default CustomList;