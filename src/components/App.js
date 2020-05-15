import {Component} from 'react';
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

const mapStateToProps = (state) => {
  return {
    screenHeight: state.patenTrack.screenHeight,
    screenWidth: state.patenTrack.screenWidth
  };
};

const mapDispatchToProps = {
  initEnvironment
};

export default connect(mapStateToProps, mapDispatchToProps)(App);