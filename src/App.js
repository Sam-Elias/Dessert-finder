import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppSidebar from './components/AppSidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppSidebar />
        <div className="map">
          <div>MAP</div>
        </div>
        <AppFooter />

      </div>
    );
  }
}

export default App;
