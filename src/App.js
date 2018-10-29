import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/AppHeader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <nav className="sidebar">
          <div>
          <div>Search</div>
          <ul className="sidebar">
            <li>dessert 1</li>
            <li>dessert 2</li>
            <li>dessert 3</li>
          </ul>
          </div>
        </nav>
        <div className="map">
          <div>MAP</div>
        </div>
        <footer className="footer">
          <div>Made by Sam Elias</div>
        </footer>

      </div>
    );
  }
}

export default App;
