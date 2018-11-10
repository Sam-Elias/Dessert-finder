import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppSidebar from './components/AppSidebar';
import AppInfobar from './components/AppInfobar'
import AppMap from './components/AppMap';
import escapeStringRegexp from 'escape-string-regexp'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers:[],
      currentUsers: [],
      selectedUser:{},
      map:{},
      markers: [],
      query:"",
      infoWindowOpen: false,
      showInfobar: false,
    }
  }

  componentDidMount = () => {
    this.getUsers()
  }

  getUsers = () => {
    fetch("https://api.myjson.com/bins/cm76u")
      .then(resp => resp.json())
      .then(data => {this.setState({allUsers: data.users, currentUsers: data.users}, this.loadMap())})  //sets the state when it receives the data from the promise, then it calls the loadMap function
      .catch(error => {return (<div><h1>We got this problem :${error}</h1><p>Please reload your page</p></div>)})
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyARW8_P5byg0dhnLlZkraFBi6X_PmMshQQ&v=3&callback=renderMap")
    window.renderMap = this.renderMap  //sets the renderMap function google will look for on the DOM to the this renderMap
  }

  renderMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.420830, lng: -119.698189},
      zoom: 13
    })
    this.makeMarkers(map)
  }

  makeMarkers = (map) => {
    let _markers = []
    this.state.currentUsers.forEach(user => {
      let marker = new window.google.maps.Marker({
      position: user.position,
      map: map,
      animation: window.google.maps.Animation.DROP,
      infowindow:{},
      title: user.dessert,
      getAnimation: null
    })
      marker.infowindow = new window.google.maps.InfoWindow({
        content: `<div><h1 id="content">${marker.title}</h1><div>`
      })
      _markers = [..._markers, marker]
      this.add_listener(marker)
    })
    this.setState({markers: _markers})
  }

  filterUsers = (query) => {
    const match = new RegExp(escapeStringRegexp(query.target.value), 'i')  //create a regular expression instance with the query value, case insensitive
    let filteredByDessert = this.state.allUsers.filter((user) => match.test(user.dessert))  //create an array of users.dessert that match the regular expression
    this.setState({query: query.target.value.trim(), currentUsers: filteredByDessert}, this.makeMarkers(this.state.map))  //set the query state and update current users
  }

  handleClick = (clicked) => {
    this.state.markers.forEach( marker => this.closeInfoWindow(marker.infowindow))
    let liValue
    let marker
    if (clicked.target) {
      liValue = clicked
      const matchedMarker = this.state.markers  //loop through the markers array and matched with the li clicked
        .find(marker => marker.title === liValue.target.innerHTML)
      const matchedUser = this.state.currentUsers  //loop through the users array and matched with the dessert clicked
        .find(user => user.dessert === liValue.target.innerHTML)
      this.showInfoWindow(matchedMarker)
      this.showInfobar()
      matchedMarker.setAnimation(window.google.maps.Animation.BOUNCE)
      marker && setTimeout(()=>marker.setAnimation(null) ,3500)
      this.setState({selectedUser: matchedUser})
    } else {
      marker = clicked
      const matchedUser = this.state.currentUsers //loop through the users array and matched with the marker clicked
        .find(user => user.dessert === marker.title)
      this.showInfoWindow(marker)
      this.showInfobar()
      marker && marker.setAnimation(window.google.maps.Animation.BOUNCE)
      setTimeout(()=>marker.setAnimation(null) ,3500)
      this.setState({selectedUser: matchedUser})
    }}

  add_listener = (marker) => {
    marker.addListener('click', () => {this.handleClick(marker)})
  }  

  setMarkers = (map, markers) => {
    markers.map( marker => marker.setMap(map))
  }

  eraseMarkers = (markers) => {
    this.setMarkers(null, markers)
  } 

  showInfoWindow = (marker) => {
    marker.infowindow.open(this.state.map, marker)
  }

  closeInfoWindow = (infowindow) => {
    infowindow.close()
  }

  showInfobar = () => {
    document.getElementById("infobar").style.display = "block"  //grabs HTML element with id infobar and sets display to block
    const app = document.getElementById("app")  //moves the grid template to having the sidebar with 400px width
    app.style.setProperty('grid-template-columns','400px 1fr')
  }

  hideInfobar = () => {
    document.getElementById("infobar").style.display = "none"  //grabs HTML element with id infobar and sets display to none
    const app = document.getElementById("app")  //moves the grid template back to having the sidebar with 200px width
      app.style.setProperty('grid-template-columns','200px 1fr')
    this.setState({showInfobar: false})  
  }

  render() {
    return (
      <div id="app">
        <AppHeader />
        <AppSidebar
          query = {this.state.query}
          filterUsers = {this.filterUsers}
          currentUsers = {this.state.currentUsers}
          handleClick = {this.handleClick}
        />
        <AppInfobar
          hideInfobar = {this.hideInfobar}
          selectedUser = {this.state.selectedUser}
        />
        <AppMap />
        <AppFooter />
      </div>
    );
  }
}
function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0]  //grabs an script element existing on the DOM
  const script = window.document.createElement("script")  //creates a script element
  script.src = url  //sets the source of the newly created script tag to the "url" parameter
  script.assync = true  //sets the assync property to true
  script.defer = true  //sets the defer property to true
  index.parentNode.insertBefore(script, index)  // insert our newly created script into the DOM.
}
export default App;
