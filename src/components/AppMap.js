import React, {Component} from 'react'

class AppMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map:{},
      markers:[],
      infowindow:{}
    }
  }

  componentDidMount = () => {
    this.renderMap()
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.filteredUsers !== this.props.filteredUsers) {
      this.makeMarkers(this.state.map)
      this.setMarkers(null, prevState.markers)
    }
  }
  
  renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyARW8_P5byg0dhnLlZkraFBi6X_PmMshQQ&v=3&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.420830, lng: -119.698189},
      zoom: 13
    })
    this.setState({map : map})
    this.makeInfoWindow()
    this.makeMarkers(map)
    
  }

  makeMarkers = (map) =>{
    let marker
    if (this.props.filteredUsers.length === 0) {
      this.props.users.forEach(user => {
        marker = new window.google.maps.Marker({
          position: user.position,
          map: map,
          title: user.dessert})
        this.setState({markers: [...this.state.markers, marker]})
      })
      this.state.markers.forEach(marker => this.add_listener(marker))
    } else {
      let _markers = []
      this.props.filteredUsers.forEach(user => {
        marker = new window.google.maps.Marker({
        position: user.position,
        map: map,
        title: user.dessert})
        _markers = [..._markers, marker]
      })
      this.setState({markers : _markers})
      _markers.forEach(marker => this.add_listener(marker))
    }
}
    
  setMarkers = (map, markers) => {
    markers.map( marker => {marker.setMap(map)})
  }

  makeInfoWindow = () => {
    let cont = '<div id="content"> <h1>HITHERE!</h1> </div>'
    let infowindow = new window.google.maps.InfoWindow({
      content: cont
    });
    this.setState({infowindow: infowindow})
  }
  add_listener = (marker) => {
    console.log(marker)
    marker.addListener('click', this.handleClick)
  }

  handleClick = (marker) => {
    console.log(`marker: ${marker} \n infowindow: ${this.state.infowindow}`)
    this.state.infowindow.open(this.state.map, marker)
  }
  render() {
   
    return (
      <main className="mapContainer">
        <div id="map">MAP</div>
      </main>
      
    )
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
export default AppMap