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
      currentUsers: [],
      allUsers:[],
      selectedUser:{},
      query:"",
      markers: [],
      infoWindows: [],
      markerBouncing: false,
      infoWindowOpen: false,
      showInfobar: false,
      firstFilter: false
    }
  }

  componentDidMount = () => {
    this.getUsers()
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
    this.makeMarkers(map)
  }

  makeMarkers = (map) => {
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
    this.setState({markers: _markers, infoWindows: _infowindows})
  }

  componentDidUpdate = (_, prevState) => {
    console.log(1)
    if (this.state.firstFilter) {
      this.setMarkers(null, prevState.markers)
    } else if (this.state.query !== prevState.query) {
      this.filterUsers()
    } else if (this.state.showInfobar) {
      this.showInfobar() 
    } else if (prevState.infoWindowOpen && (this.state.infoWindowOpen !== prevState.infoWindowOpen)) {
      this.closeInfoWindow(prevState.infoWindowOpen)
    }
  }

  filterUsers = () => {
    const match = new RegExp(escapeStringRegexp(this.state.query), 'i')
    let filteredByDessert = this.state.allUsers.filter((user) => match.test(user.dessert))
    this.setState({currentUsers: filteredByDessert, firstFilter: true})
  }

  updateQuery = (query) => {
    this.setState({query: query.target.value.trim()})
  }

  handleClick = (clicked) => {
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
    this.state.markerBouncing && this.state.markerBouncing.setAnimation(null)
    document.getElementById("infobar").style.display = "none"
    const app = document.getElementById("app")
      app.style.setProperty('grid-template-columns','200px 1fr')
    this.setState({showInfobar: false})
  }

  closeInfoWindow = (infowindow) => {
    infowindow.close()
  }

  render() {
    return (
      <div id="app">
        <AppHeader />
        <AppSidebar
          query = {this.state.query}
          updateQuery = {this.updateQuery}
          currentUsers = {this.state.currentUsers}
          handleClick = {this.handleClick}
          setMarkers = {this.setMarkers}
        />
        <AppInfobar
          hideInfobar = {this.hideInfobar}
          selectedUser = {this.state.selectedUser}
        />
        <AppMap 
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
