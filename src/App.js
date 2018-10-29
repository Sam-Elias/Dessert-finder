import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          Home-made dessert finder
        </header>
        <nav className="sidebar">
          <div>Search</div>
          <ul className="sidebar">
            <li>dessert 1</li>
            <li>dessert 2</li>
            <li>dessert 3</li>
          </ul>
        </nav>
        <div className="map">
          MAP
        </div>
        <footer className="footer">
          Made by Sam Elias
        </footer>

      </div>
    );
  }
}

export default App;
