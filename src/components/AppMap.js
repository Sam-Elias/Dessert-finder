import React, {Component} from 'react'

class AppMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers:[],
      map:{}
    }
  }

  componentDidMount = () => {
    this.renderMap()
    console.log(this.state.map)
    console.log('didMount ran!')
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    
    if (prevProps.filteredUsers !== this.props.filteredUsers) {
      console.log(`HHAHAHAHAHAHAAH prevState.markers = ${prevState.markers}`)
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
    this.makeMarkers(map)
  }

  makeMarkers = (map) =>{
    this.setState({markers: []})
    let marker
    console.log(` state.markers from makeMarkers: ${this.state.markers}`)
    
    
    if (this.props.filteredUsers.length === 0) {
      this.props.users.forEach(user => {
        console.log('filtered = 0')
        marker = new window.google.maps.Marker({
        position: user.position,
        map: map,
        title: user.dessert})
        this.setState({markers: [...this.state.markers, marker]})
      })
    } else {
      let _markers = []
      this.props.filteredUsers.forEach(user => {
        console.log('filtered != 0')
        marker = new window.google.maps.Marker({
        position: user.position,
        map: map,
        title: user.dessert})
        _markers = [..._markers, marker]
      })
      this.setState({markers : _markers})
  }
}
    
  setMarkers = (map, markers) => {
    console.log('setMarkers ran')
    markers.map( marker => {marker.setMap(map)})
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