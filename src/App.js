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
      markers: [],
      query:"",
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
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyARW8_P5byg0dhnLlZkraFBi6X_PmMshQQ&v=3&callback=renderMap")
    window.renderMap = this.renderMap
    console.log("loadMap")
  }

  renderMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.420830, lng: -119.698189},
      zoom: 13
    })
    console.log("renderMap will call makeMrkers")
    console.log(this.state.currentUsers.length >= 0)
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
    console.log('infowindows from makemarkers: ')
    _markers.forEach(marker => console.log(marker.infowindow))
    console.log('makeMarkers will set the state of map, marker and infowindows')
    this.setState({markers: _markers})
  }

  componentDidUpdate = (_, prevState) => {
    //check to see if allUsers loaded from API and if currentUsers change(to prevent recursive loop)
    if ((this.state.allUsers.length >= 0) && (prevState.currentUsers !== this.state.currentUsers)) 
      {this.loadMap()} else 
        {console.log('The component updated wihtout loading a new map')}
    console.log(prevState.infoWindowOpen)
  }

  eraseMarkers = (markers) => {
    this.setMarkers(null, markers)
    //this.renderMap()
    console.log('erasedMarkers')
  } 

  filterUsers = (query) => {
    const match = new RegExp(escapeStringRegexp(this.state.query), 'i')
    let filteredByDessert = this.state.allUsers.filter((user) => match.test(user.dessert))
    this.setState({query: query.target.value.trim(), currentUsers: filteredByDessert})
    //this.filterUsers()
    console.log('bindQuery')
  }

  handleClick = (clicked) => {
    this.state.markers.forEach( marker => this.closeInfoWindow(marker.infowindow))
    let liValue
    let marker
    console.log('handleClick')
    if (clicked.target) {
      console.log('liwasClicked')
      liValue = clicked
      const matchedMarker = this.state.markers
        .find(marker => marker.title === liValue.target.innerHTML)
      const matchedUser = this.state.currentUsers
        .find(user => user.dessert === liValue.target.innerHTML)
      this.showInfoWindow(matchedMarker)
      this.showInfobar()
      //start animation and stop it in 3.5 seconds
      matchedMarker.setAnimation(window.google.maps.Animation.BOUNCE)
      marker && setTimeout(()=>marker.setAnimation(null) ,3500)
      this.setState({selectedUser: matchedUser})
    } else {
      console.log('markerwasClicked')
      marker = clicked
      const matchedUser = this.state.currentUsers
        .find(user => user.dessert === marker.title)
      this.showInfoWindow(marker)
      this.showInfobar()
      //start animation and stop it in 3.5 seconds
      marker && marker.setAnimation(window.google.maps.Animation.BOUNCE)
      setTimeout(()=>marker.setAnimation(null) ,3500)
      this.setState({selectedUser: matchedUser})
    }}

  setMarkers = (map, markers) => {
    markers.map( marker => marker.setMap(map))
    console.log('setMarkers')
  }

  add_listener = (marker) => {
    marker.addListener('click', () => {this.handleClick(marker)})
    console.log('addListeners')
  }

  showInfoWindow = (marker) => {
    marker.infowindow.open(this.state.map, marker)
    console.log('showInfoWindow')
  }

  closeInfoWindow = (infowindow) => {
    infowindow.close()
    console.log('closeInfoWindow')
  }

  showInfobar = () => {
    document.getElementById("infobar").style.display = "block"
    const app = document.getElementById("app")
    app.style.setProperty('grid-template-columns','400px 1fr')
    console.log('showInfobar')
  }

  hideInfobar = () => {
    document.getElementById("infobar").style.display = "none"
    const app = document.getElementById("app")
      app.style.setProperty('grid-template-columns','200px 1fr')
    this.setState({showInfobar: false})
    console.log('hideInfobar')
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
