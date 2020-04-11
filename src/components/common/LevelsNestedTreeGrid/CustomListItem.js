import React, {useState} from 'react';

import {
  ListItem
} from "@material-ui/core";

import { ArrowRight, ArrowDropDown } from "@material-ui/icons";
import CustomList from "./CustomList";
import useStyles from "./styles";

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

export default CustomListItem;