import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initEnvironment} from "../actions/patenTrackActions";
import routes from '../routes';

class App extends Component {
  componentDidMount() {
    this.props.initEnvironment();
  }
  render() {
    return routes;
  }
}

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = {
  initEnvironment
};

export default connect(mapStateToProps, mapDispatchToProps)(App);