import React, { useState, useEffect } from "react";
import useStyles from "./styles";

import FullWidthSwitcher from "../FullWidthSwitcher";
import TabsContainer from '../Tabs';

import { Line, Pie } from 'react-chartjs-2';

import { DataSet, Graph3d } from "vis-graph3d/standalone";

import 'chartjs-plugin-labels';


import { connect } from 'react-redux';

import { Grid } from "@material-ui/core";
import Loader from "../Loader";
import classnames from 'classnames';

import { getCharts, setChartTabIndex } from "../../../actions/patenTrackActions";



const backgroundColor = 'rgb(255, 170, 0)';

function Charts(props) {
  const { chartTab, setChartTabIndex } = props;
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  /*const charts = props.chartsTab.length ? props.chartsTab[chartTab] : [];*/
  const tabLabel = (chartTab === 2) ? "tab3" : (chartTab === 1) ? "tab2" : "tab1";
 
  const charts = (props.chatWithLabel[tabLabel]) ? props.chatWithLabel[tabLabel] : [];
  const isExpaned = props.currentWidget === 'charts';

  const [data, setData] = useState(null);

  var graph = null;

  const [options, setOptions] = useState({
    width:  '100%',
    height: '100%',
    style: 'dot-line',
    showPerspective: true,
    showGrid: true,
    showShadow: false,
    keepAspectRatio: true,
    verticalRatio: 0.5
  });

  useEffect(() => {
    if(props.chatWithLabel['tab2'] != undefined && props.chatWithLabel['tab2'].chart1.length > 0) {
      let tempData = new DataSet();
      let counter = 0, steps = 5, axisMax = 10, axisStep = axisMax / steps;
      for (let x = 0; x < axisMax; x+=axisStep) {
        for (let y = 0; y < axisMax; y+=axisStep) {
          const value = custom(x,y);
          tempData.add({x:x, y:y, z: value});
        }
      }
      console.log(tempData);
      setData(tempData);
      if(chartTab == "tab2") {
        callChart()      
      }
    }
  }, [props.chatWithLabel]);


  //console.log("tabLabel", tabLabel, props.chatWithLabel, charts);
  const getWidthChart = () => {
    if(props.screenHeight < 400)
      return '50%';
    if(props.screenHeight < 500)
      return '70%';
    if(isExpaned)
      return '100%';
    if(props.screenHeight < 800)
      return '80%';
    return '100%';
  };

  const chartColors = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'];

  const custom = (x, y) =>{
    return (-Math.sin(x/Math.PI) * Math.cos(y/Math.PI) * 10 + 10);
  }

  const callChart = () => {
    const container = document.getElementById("graphChart");
    console.log("container", container);
    if(container != null && container != undefined) {
      let newOption;
      if(isExpaned){
        newOption = {...options};
        newOption.width = ( props.screenWidth - 200 ) +'px';
        newOption.height = ( props.screenHeight - 200 )+'px';
      } else {
        newOption = {...options};
        newOption.width = '100%';
        newOption.height = '100%';
      }
      graph = new Graph3d(container, data, newOption)
    }
  }

  const createGraph = () => {
    callChart();
  }
  
  
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
              <div className={classes.container} style={{width: '100%'}}>
                {
                  chartTab == 1
                  ?
                  <div id={"graphChart"}/>   
                  :
                  ''
                }                
                {     
                  chartTab == 1
                  ? 
                    createGraph()
                  :                            
                  Object.entries(charts).map((chart, index) =>
                    <Grid
                      key={index}
                      className={classes.gridItem}
                      style={{
                        maxWidth: props.currentWidget === 'charts' ? 600 : 'initial',
                        flexBasis: 'initial',
                        position: 'relative'
                      }}
                    >
                      <div
                        className={classes.chart}
                        style={{
                          margin: index > 1 ? '5px 5px 0' : 5,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0
                        }}
                      >
                        <div
                          className={classes.wrap}
                          style={{
                            height: '100%',
                            width: getWidthChart(),
                            margin: '0 auto'
                          }}
                        >
                          {
                          (chartTab === 0 && (index === 0 || index === 1))
                          ? 
                          <Pie
                            data = {{
                              labels: chart[1].map(item => item.label),
                              datasets: [{
                                data: chart[1].map(item => item.value),
                                backgroundColor: chart[1].map( (item, index)  => chartColors[index])
                              }]
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              legend: {
                                display: false
                              },
                              layout: {
                                padding: {
                                  left: 5,
                                  right: 5,
                                  top: 5,
                                  bottom: 5
                                }
                              },
                              plugins: {
                                labels: {
                                  render: 'label',
                                }
                              }
                            }}
                            lg={6}
                            xs={6}
                          />
                          :
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
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              layout: {
                                padding: {
                                  left: 5,
                                  right: 5,
                                  top: 5,
                                  bottom: 5
                                }
                              },
                            }}
                            lg={6}
                            xs={6}
                          />
                          }
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
  //console.log("VALUES", state.patenTrack.charts, Object.values(state.patenTrack.charts));
  /**chartsTab: Object.values(state.patenTrack.charts), */
  return {
    chartsTab: Object.values(state.patenTrack.charts),
    chatWithLabel: state.patenTrack.charts,
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.chartsLoading,
    screenWidth: state.patenTrack.screenWidth,
    screenHeight: state.patenTrack.screenHeight,
    chartTab: state.patenTrack.chartTab
  };
};

const mapDispatchToProps = {
  getCharts,
  setChartTabIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);