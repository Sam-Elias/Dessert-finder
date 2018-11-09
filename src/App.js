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
      usersHolder: [{position: {lat: 34.402367, lng: -119.726738},
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
      //filteredUsers:[],
      currentUsers: [],
      allUsers:[],
      selectedUser:{},
      //map:[],
      query:"",
      markers: [],
      infoWindows: [],
      markerBouncing: false,
      infoWindowOpen: false,
      showInfobar: false
    }
  }

  componentDidMount = () => {
    this.getUsers()
    //this.renderMap()
    //this.setState({currentUsers: this.state.allUsers})
  }

  getUsers = () => {
    fetch("https://api.myjson.com/bins/cm76u")
      .then(resp => resp.json())
      .then(data => {this.setState({allUsers: data.users, currentUsers: data.users})})
      .then(this.loadMap())
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyARW8_P5byg0dhnLlZkraFBi6X_PmMshQQ&v=3&callback=renderMap")
    window.renderMap = this.renderMap
  }

  renderMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.420830, lng: -119.698189},
      zoom: 13
    })
    //this.setState({map : map})
    this.makeMarkers(map)
    //this.makeInfoWindows(this.state.markers)
  }

  makeMarkers = (map) => {
    //let marker
    let _markers = []
    let _infowindows = []
    this.state.currentUsers.forEach(user => {
      let marker = new window.google.maps.Marker({
      position: user.position,
      map: map,
      animation: window.google.maps.Animation.DROP,
      title: user.dessert,
      getAnimation: null})
      let infowindow = new window.google.maps.InfoWindow({
        content: `<div><h1 id="content">${marker.title}</h1><div>`
      })
      _markers = [..._markers, marker]
      _infowindows = [..._infowindows, infowindow]
      this.add_listener(marker)
    })
    this.setState({markers : _markers, infoWindows: _infowindows})

    //_markers.forEach(marker => this.add_listener(marker))
  }
/*
  makeInfoWindows = (markers) => {
    let infowindow
    let _infowindows = []
    markers.forEach(marker => {
      let infowindow = new window.google.maps.InfoWindow({
        content: `<div id="content">${marker.title}</div>`
      })
      _infowindows = [..._infowindows, infowindow]
    })
    this.setState({infoWindows : _infowindows})
  }*/
  componentDidUpdate = (_, prevState) => {
    (this.state.query !== prevState.query) &&
      this.filterUsers()
    this.state.showInfobar && 
      this.showInfobar()
    prevState.infoWindowOpen && 
      (this.state.infoWindowOpen !== prevState.infoWindowOpen) && 
        this.closeInfoWindow(prevState.infoWindowOpen)
  }

  filterUsers = () => {
    const match = new RegExp(escapeStringRegexp(this.state.query), 'i')
    let filteredByDessert = this.state.allUsers.filter((user) => match.test(user.dessert))
    this.setState({currentUsers:filteredByDessert})
    //this.setState({filteredUsers:_filteredUsers})
  }

  updateQuery = (query) => {
    this.setState({query: query.target.value.trim()})
  }

  handleClick = (clicked) => {
    console.log(clicked)
    this.state.markerBouncing && this.state.markerBouncing.setAnimation(null)
    let liValue
    let marker
    if (clicked.target) {
      liValue = clicked
      const matchedMarker = this.state.markers
        .find(marker => marker.title === liValue.target.innerHTML)
      const matchedInfoWindow = this.state.infoWindows
        .find(infowindow => infowindow.content.includes(matchedMarker.title))
      const matchedUser = this.state.currentUsers
        .find(user => user.dessert === liValue.target.innerHTML)
      this.showInfoWindow(matchedMarker, matchedInfoWindow)
      this.setState({
        showInfobar: true, 
        markerBouncing: matchedMarker, 
        selectedUser: matchedUser})
      matchedMarker.setAnimation(window.google.maps.Animation.BOUNCE)
    } else {
      marker = clicked
      const matchedInfoWindow = this.state.infoWindows
        .find(infowindow => infowindow.content.includes(marker.title))
      const matchedUser = this.state.currentUsers
        .find(user => user.dessert === marker.title)
      this.showInfoWindow(marker, matchedInfoWindow)
      this.setState({
        showInfobar: true, 
        markerBouncing: marker,
        selectedUser: matchedUser})
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
    }}

  



  setMarkers = (map, markers) => {
    markers.map( marker => marker.setMap(map))
  }

  add_listener = (marker) => {
    marker.addListener('click', () => {this.handleClick(marker)})
  }
/*
  makeInfoWindows = (markers) => {
    let infowindow
    let _infowindows = []
    markers.forEach(marker => {
      infowindow = new window.google.maps.InfoWindow({
        content: `<div id="content"> <h1>${marker.title}</h1> </div>`
      })
      _infowindows = [..._infowindows, infowindow]
    })
    this.setState({infoWindows : _infowindows})
  }
*/
  showInfoWindow = (marker, infoWindow) => {
    infoWindow.open(this.state.map, marker)
    this.setState({infoWindowOpen: infoWindow})
  }

  showInfobar = () => {
    document.getElementById("infobar").style.display = "block"
      const app = document.getElementById("app")
      app.style.setProperty('grid-template-columns','400px 1fr')
  }

  hideInfobar = () => {
    console.log('hide')
    this.state.markerBouncing && this.state.markerBouncing.setAnimation(null)
    document.getElementById("infobar").style.display = "none"
    const app = document.getElementById("app")
      app.style.setProperty('grid-template-columns','200px 1fr')
    this.setState({showInfobar: false})
  }

  closeInfoWindow = (infowindow) => {
    infowindow.close()
    console.log("closed")
  }

  render() {
    return (
      <div id="app">
        <AppHeader />
        <AppSidebar
          query = {this.state.query}
          updateQuery = {this.updateQuery}
          allUsers = {this.state.allUsers}
          currentUsers = {this.state.currentUsers}
          filterUsers = {this.filterUsers}
          handleClick = {this.handleClick}
        />
        <AppInfobar
          hideInfobar = {this.hideInfobar}
          selectedUser = {this.state.selectedUser}
        />
        <AppMap 
          //currentUsers = {this.state.filteredUsers.length === 0 ? this.state.allUsers : this.state.filteredUsers}
          //initMap = {this.initMap}
          //map = {this.state.map}
          //markers = {this.state.markers}
          //makeMarkers = {this.makeMarkers}
          //setMarkers = {this.setMarkers}
          //infoWindows = {this.state.InfoWindows}
          //makeInfoWindows = {this.makeInfoWindows}
          //closeInfoWindow = {this.state.closeInfoWindow}
        />
        <AppFooter />

      </div>
    );
  }
}
function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = url
  script.assync = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}
export default App;
