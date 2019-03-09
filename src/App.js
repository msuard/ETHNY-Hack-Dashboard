import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Root from './containers/root'
import DashboardContainer from './containers/dashboard'

class App extends Component {
  render() {
    return (
      <Root>
        <DashboardContainer/>
      </Root>
    );
  }
}

export default App;
