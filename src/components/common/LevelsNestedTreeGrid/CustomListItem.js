import React, {useState} from 'react';
import {
  ListItem, Typography
} from "@material-ui/core";
import { ArrowRight, ArrowDropDown } from "@material-ui/icons";
import CustomList from "./CustomList";

function CustomListItem(props) {
  const {depth} = props;
  const [isOpened, setOpened] = useState(depth === 0 ? 1 : 0);
  
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
    <ListItem style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      <div
        onClick={() => {
          setOpened(!isOpened);
        }}
        style={{display: 'flex'}}
      >

        {
          props.depth !== 3 && (isOpened ? <ArrowDropDown/> : <ArrowRight/>)
        }
        <Typography style={{paddingLeft: 10, fontSize: 12}}>
          { getLabel()}
        </Typography>
      </div>
      {
         (isOpened && props.child) ? <CustomList data={props.child} depth={props.depth + 1}/>: ''
      }
    </ListItem>
  )
}

export default CustomListItem;