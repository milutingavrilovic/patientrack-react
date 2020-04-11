import React, { useState } from "react";

import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import PerfectScrollbar from 'react-perfect-scrollbar';

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
        <PerfectScrollbar
          options={{
            suppressScrollX: true,
            minScrollbarLength: 20,
            maxScrollbarLength: 30,
          }}
        >
          <div className={isExpanded ? classes.contextExpand : classes.context}>
            {
              props.comments
                ?
                props.comments.map((comment, index) =>
                  <p
                    key={index}
                    className={isExpanded ? classes.typographyExpand : classes.typography}
                  >
                    {comment}
                  </p>)
                :
                ''
            }
          </div>
        </PerfectScrollbar>
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"comments"}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    comments: state.patenTrack.comments,
    currentWidget: state.patenTrack.currentWidget
  };
};

export default connect(mapStateToProps)(CommentComponents);
