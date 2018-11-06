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
      allUsers: [],
      filteredUsers:[],
      currentUsers:[],
      query:""
    }
  } 

  componentDidMount = () => {
    this.getUsers()
  }

  getUsers = () => {
    fetch("https://api.myjson.com/bins/cm76u")
      .then(resp => resp.json())
      .then(data => {this.setState({allUsers: data.users})})
  }

  filterUsers = (_filteredUsers) => {
    console.log(`filtered users from App: ${this.state.filteredUsers } \nfilteredUsers from sidebar: ${_filteredUsers}` )
    this.setState({currentUsers:_filteredUsers})
    this.setState({filteredUsers:_filteredUsers})
    console.log(`filtered users from App: ${this.state.filteredUsers } \nfilteredUsers from sidebar: ${_filteredUsers}` )
  }

  updateQuery = (query) => {
    this.setState({query: query.target.value.trim()})
    console.log('updated')
  }

  handleClick = (event) => {
    console.log(event)
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppSidebar
          query = {this.state.query}
          updateQuery = {this.updateQuery}
          filterUsers = {this.filterUsers}
          allUsers = {this.state.allUsers}
          filteredUsers = {this.state.filteredUsers}
          currentUsers = {this.state.filteredUsers.length === 0 ? this.state.allUsers : this.state.filteredUsers}
          handleClick = {this.handleClick}

        />
        <AppMap 
          currentUsers = {this.state.filteredUsers.length === 0 ? this.state.allUsers : this.state.filteredUsers}
          allUsers = {this.state.users}
          filteredUsers = {this.state.filteredUsers}
          handleClick = {this.handleClick}
        />
        <AppFooter />

      </div>
    );
  }
}

export default App;
