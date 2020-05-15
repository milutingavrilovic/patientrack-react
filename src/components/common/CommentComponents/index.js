import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Loader from "../Loader";
import {getComments, updateComment} from "../../../actions/patenTrackActions";
import {TextareaAutosize } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

function CommentComponents(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const [comment, setComment] = useState("");
  const isExpanded = props.currentWidget === 'comments';
  const [timeInterval, setTimeInterval] =  useState( null );
  const WAIT_INTERVAL = 2000;

  const handleCommentChange = (event) => {
      // Clears the previously set timer.
      setComment(event.target.value);
      clearTimeout(timeInterval);
      setTimeInterval(setTimeout(() => {
        let method = "POST";
        if(props.comments.length > 0) {
          method = "PUT";
        }
        let type = "asset", selectedItem = "";
        if(props.selectedRFID !== '') {
          type = 'collection';
          selectedItem = props.selectedRFID;
        } else {
          selectedItem = props.currentAsset;
        }        
        let data = new FormData();
        data.append('comment', comment);        

        props.updateComment(data, method, type, selectedItem);
      }, WAIT_INTERVAL));
  };
  let commentShow = "";
  /*if(props.comments && props.comments.length > 0){
    commentShow = props.comments[0].comment;
  }
  
  if(props.comments && props.comments.length > 0){
    props.comments.map((comment, index) =>{
      commentShow = comment.comment;
    });
  }
  */
  return (
    <div
      className     = {classes.commentsComponents}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        <div className={classes.scrollbar}>
          {
          props.isLoading
          ?
            <Loader/>
          :
            <PerfectScrollbar
              options={{
                suppressScrollX: true,
                minScrollbarLength: 20,
                maxScrollbarLength: 30,
              }}
            >
              <TableContainer>
                <Table
                  aria-labelledby="tableTitle"
                  size={'small'}
                  aria-label="short table"
                >            
                <TableBody>
                  {
                    props.comments.length > 0
                    ?
                    props.comments.map( (c, index) => {
                      const createdAt = new Date(c.created_at);
                      return (
                        <TableRow hover tabIndex={-1} key={index} >                      
                          <TableCell align="left">
                            {new Intl.DateTimeFormat('en-US').format(createdAt)}
                          </TableCell>
                          <TableCell align="left">
                            {c.comment}
                          </TableCell>
                        </TableRow>
                      )
                    })
                    :
                    ''
                  }
                </TableBody>
                </Table>
              </TableContainer>
            </PerfectScrollbar>
          }
        </div>
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"comments"}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("COMMENTS",state.patenTrack.comments);
  return {
    comments: state.patenTrack.comments,
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.commentsLoading,
    screenHeight: state.patenTrack.screenHeight,
    screenWidth: state.patenTrack.screenWidth,
    selectedRFID: state.patenTrack.selectedRFID,
    currentAsset: state.patenTrack.currentAsset,
  };
};

const mapDispatchToProps = {
  getComments,
  updateComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponents);
