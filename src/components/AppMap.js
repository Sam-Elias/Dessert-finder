import React, {Component} from 'react'

class AppMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers:[]
    }
  }

  componentDidMount() {
    this.renderMap()
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
    this.props.users.forEach(user => {this.makeMarker(user, map)})
  }

  makeMarker = (user, map) =>{
    const marker = new window.google.maps.Marker({
      position: user.position,
      map: map,
      title: user.dessert})
    marker.setMap(map)
    this.setState({markers: [...this.state.markers, marker]})
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