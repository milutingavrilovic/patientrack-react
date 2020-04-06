import React, {useState} from 'react';
import useStyles from "./styles";
import {setCurrentWidget} from "../../../actions/patientTrackActions";
import {connect} from 'react-redux';

import {
  ZoomOutMap
} from "@material-ui/icons";

function FullWidthSwitcher(props) {
  const [showSwitcher, setShowSwitcher] = useState(0);
  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.showSwitcher}
        onMouseOver={() => {setShowSwitcher(true)}}
        style={{backgroundColor: 'transparent'}}
      >
      </div>
      {
        showSwitcher
        ?
          <div
            className={classes.switcher}
            onClick={() => {
              props.setCurrentWidget(props.widget);
            }}
            onMouseLeave={() => {setShowSwitcher(false)}}
          >
            {showSwitcher ? <ZoomOutMap style={{fontSize: 12}}/> : ''}
          </div>
        :
          ''
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = {
  setCurrentWidget
};


export default connect(mapStateToProps, mapDispatchToProps)(FullWidthSwitcher);