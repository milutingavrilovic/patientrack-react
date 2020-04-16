import React, { useState } from "react";
import useStyles from "./styles";

import FullWidthSwitcher from "../FullWidthSwitcher";
import TabsContainer from '../Tabs';

import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import Loader from "../Loader";
import classnames from 'classnames';

import { getCharts, setChartTabIndex } from "../../../actions/patenTrackActions";

const backgroundColor = 'rgb(255, 170, 0)';

function Charts(props) {
  const { chartTab, setChartTabIndex } = props
  const classes = useStyles();

  const [showSwitcher, setShowSwitcher] = useState(0);
  const charts = props.chartsTab.length ? props.chartsTab[chartTab] : [];

  const getWidthChart = () => {
    if(props.screenHeight < 400)
      return '50%';
    if(props.screenHeight < 500)
      return '70%';
    if(props.screenHeight < 700)
      return '80%';
    if(props.screenHeight < 800)
      return '100%';
  };


  return (
    <div
      className={classes.charts}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.chatsContainer}>
          {
            !props.isLoading
            ?
              <div className={classes.container}>
                {
                  Object.entries(charts).map((chart, index) =>
                    <Grid
                      key={index}
                      className={classes.gridItem}
                      style={{
                        maxWidth: props.currentWidget === 'charts' ? 600 : 'initial',
                        flexBasis: 'initial'
                      }}
                    >
                      <div
                        className={classes.chart}
                        style={{
                          margin: index > 1 ? '5px 5px 0' : 5,
                        }}
                      >
                        <div
                          className={classes.wrap}
                          style={{
                            width: getWidthChart(),
                            margin: '0 auto'
                          }}
                        >
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
                      </div>
                    </Grid>)
                }
              </div>
            :
              <div
                className={classnames(classes.container, classes.loaderWrapper)}
                style={{height: props.screenHeight/3.5}}
              >
                <Loader/>
              </div>
          }

        <TabsContainer
          activeTabId={chartTab}
          setActiveTabId={setChartTabIndex}
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
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.chartsLoading,
    screenHeight: state.patenTrack.screenHeight,
    chartTab: state.patenTrack.chartTab
  };
};

const mapDispatchToProps = {
  getCharts,
  setChartTabIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);