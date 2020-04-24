import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Loader from "../Loader";
import {getComments} from "../../../actions/patenTrackActions";

function CommentComponents(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'comments';

  return (
    <div
      className     = {classes.commentsComponents}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
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
              <div
                className={isExpanded ? classes.contextExpand : classes.context}
                id={'comment_container'}
              >
                {
                  props.comments
                    ?
                    props.comments.map((comment, index) =>
                      <p
                        key={index}
                        className={isExpanded ? classes.typographyExpand : classes.typography}
                        style={{
                          fontSize: '1rem'
                        }}
                      >
                        {comment.comment}
                      </p>)
                    :
                    ''
                }
              </div>
            </PerfectScrollbar>
        }
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"comments"}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    comments: state.patenTrack.comments,
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.commentsLoading,
    screenHeight: state.patenTrack.screenHeight,
    screenWidth: state.patenTrack.screenWidth
  };
};

const mapDispatchToProps = {
  getComments
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponents);
