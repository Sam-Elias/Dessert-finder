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
      users: [{position: {lat: 34.402367, lng: -119.726738},
        name: "Sam Nakamoto",
        id: 0,
        dessert: "Apple Pie"},
        {position: {lat: 34.404507, lng: -119.705515},
        name: "Joe Buterin",
        id: 1,
        dessert: "Peach Cobbler"},
        {position: {lat: 34.414019, lng: -119.727126},
        name: "Katie Lovelace",
        id: 2,
        dessert: "Cheesecake"},
        {position: {lat: 34.433996, lng: -119.711859},
        name: "Adam Smith",
        id: 3,
        dessert: "Tiramisu"},
        {position: {lat: 34.439817, lng: -119.688069},
        name: "John Doe",
        id: 4,
        dessert: "Bread Pudding"},
        {position: {lat: 34.442228, lng: -119.693895},
        name: "Shawn Fanning",
        id: 5,
        dessert: "Chocolate Fudge"},
        {position: {lat: 34.420138, lng: -119.734574},
        name: "Robin Chase",
        id: 6,
        dessert: "Cupcakes"}],
      filteredUsers:[],
      usersHolder:[]
    }
  } 
  
  componentDidMount = () => {
    this.getUsers()
  }

  getUsers = () => {
    fetch("https://api.myjson.com/bins/cm76u")
      .then(resp => resp.json())
      .then(data => {this.setState({usersHolder: data.users})})
  
  }

  filterUsers = (_filteredUsers) => {
    this.setState({filteredUsers:_filteredUsers})
    console.log(`filtered users from App: ${this.state.filteredUsers } \nfilteredUsers from sidebar: ${_filteredUsers}` )
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppSidebar 
          users = {this.state.users}
          filterUsers = {this.filterUsers}
          filteredUsers = {this.state.filteredUsers}
        />
        <AppMap 
          users = {this.state.users}
          filteredUsers = {this.state.filteredUsers}
        />
        <AppFooter />

      </div>
    );
  }
}

export default App;
