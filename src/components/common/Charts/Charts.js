import React, { useState } from "react";
import useStyles from "./styles";

import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import TabsContainer from '../Tabs/TabsContainer';

import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

import {
  Grid
} from "@material-ui/core";

const backgroundColor = 'rgb(255, 170, 0)';

function Charts(props) {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  const [showSwitcher, setShowSwitcher] = useState(0);
  const charts = props.chartsTab ? props.chartsTab[activeTabId] : {};

  return (
    <div
      className={classes.charts}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.chatsContainer}>
        <div className={classes.container}>
          {
            charts && Object.entries(charts).map((chart, index) =>
              <Grid
                key={index}
                item xs={6}
                className={classes.gridItem}
                style={{
                  maxWidth: props.currentWidget === 'charts' ? 600 : 'initial',
                  flexBasis: 'initial'
                }}
              >
                <div className={classes.chart}>
                  <Line
                    data = {{
                      labels: chart[1].map(item => item.year),
                      datasets: [{
                        label: chart[0],
                        fill: false,
                        lineTension: 0.5,
                        data: chart[1].map(item => item.value),
                        backgroundColor: backgroundColor,
                        borderColor: backgroundColor,
                        borderWidth: 1
                      }]
                    }}
                    lg={6}
                    xs={6}
                  />
                </div>
              </Grid>)
          }
        </div>

        <TabsContainer
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
          tabs={['Tab1', 'Tab2', 'Tab3']}
        />
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"charts"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    chartsTab: Object.values(state.patenTrack.charts),
    currentWidget: state.patenTrack.currentWidget
  };
};

export default connect(mapStateToProps)(Charts);