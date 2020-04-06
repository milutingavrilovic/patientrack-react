import React, { useState } from "react";
import useStyles from "./styles";

import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import TabsContainer from '../Tabs/TabsContainer';

import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';

import {
  Grid
} from "@material-ui/core";

const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(153, 102, 255, 0.2)'
];
const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(153, 102, 255, 1)'
];
const borderWidth = 1;

function Charts(props) {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  const charts = props.chartsTab ? props.chartsTab[activeTabId] : {};

  return (
    <div className={classes.chatsContainer}>
      <div className={classes.container}>
        <Grid container className={classes.chartWrapper}>
          <Grid item xs={6} className={classes.gridItem}>
            <Doughnut
              data = {{
                labels: charts.chart1 ? charts.chart1.map(item => item.year) : [],
                datasets: [{
                  data: charts.chart1 ? charts.chart1.map(item => item.value) : [],
                  backgroundColor: backgroundColor,
                  borderColor: borderColor,
                  borderWidth: borderWidth
                }]
              }}
              lg={6}
              xs={6}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Doughnut
              data = {{
                labels: charts.chart2 ? charts.chart2.map(item => item.year) : [],
                datasets: [{
                  data: charts.chart2 ? charts.chart2.map(item => item.value) : [],
                  backgroundColor: backgroundColor,
                  borderColor: borderColor,
                  borderWidth: borderWidth
                }]
              }}
              lg={6}
              xs={6}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Doughnut
              data = {{
                labels: charts.chart3 ? charts.chart3.map(item => item.year) : [],
                datasets: [{
                  data: charts.chart3 ? charts.chart3.map(item => item.value) : [],
                  backgroundColor: backgroundColor,
                  borderColor: borderColor,
                  borderWidth: borderWidth
                }]
              }}
              lg={6}
              xs={6}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Doughnut
              data = {{
                labels: charts.chart4 ? charts.chart4.map(item => item.year) : [],
                datasets: [{
                  data: charts.chart4 ? charts.chart4.map(item => item.value) : [],
                  backgroundColor: backgroundColor,
                  borderColor: borderColor,
                  borderWidth: borderWidth
                }]
              }}
              lg={6}
              xs={6}
            />
          </Grid>
        </Grid>
      </div>
      <TabsContainer
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
        tabs={['Tab1', 'Tab2', 'Tab3']}
      />
      <FullWidthSwitcher widget={"charts"}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    chartsTab: [state.patientReducer.chartsTab1, state.patientReducer.chartsTab2, state.patientReducer.chartsTab3]
  };
};

export default connect(mapStateToProps)(Charts);