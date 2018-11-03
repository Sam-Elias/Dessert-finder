import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppSidebar from './components/AppSidebar';
import AppMap from './components/AppMap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
        {position: {lat: 34.402367, lng: -119.726738},
        map: this.props.map,
        name: "Sam Nakamoto",
        id: 0,
        dessert: "apple pie"},
        {position: {lat: 34.404507, lng: -119.705515},
        map: this.props.map,
        name: "Joe Buterin",
        id: 1,
        dessert: "cobbler"}
      ]
    }
  } 

  getUsers = () => {}

  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppSidebar />
        <AppMap users={this.state.users}/>
        <AppFooter />

      </div>
    );
  }
}

export default App;
