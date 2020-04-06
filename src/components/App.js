import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";
import Auth from "./auth";
import DashBoard from "./DashBoard/DashBoard";
import {connect} from 'react-redux';
import {initEnvironment} from "../actions/patientTrackActions";

class App extends Component {

  componentDidMount() {
    this.props.initEnvironment();
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/dashboard">
            <DashBoard/>
          </Route>
          <Route path="/">
            <Auth/>
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = {
  initEnvironment
};

export default connect(mapStateToProps, mapDispatchToProps)(App);