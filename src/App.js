import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppSidebar from './components/AppSidebar';
import AppMap from './components/AppMap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppSidebar />
        <AppMap />
        <AppFooter />

      </div>
    );
  }
}

export default App;
