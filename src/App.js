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
      users: [],
      filteredUsers:[]
    }
  } 
  
  componentDidMount = () => {
    this.getUsers()
  }

  getUsers = () => {
    fetch("https://api.myjson.com/bins/cm76u")
      .then(resp => resp.json())
      .then(data => {this.setState({users: data.users})})
  
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
