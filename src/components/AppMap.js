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
    console.log('didMount ran!')
  }
  
  componentDidUpdate = (prevProps) => {
    console.log(`From did update: \n prevprops: ${prevProps.filteredUsers} \n From props.filtered: ${this.props.filteredUsers}` )
    if (prevProps.filteredUsers !== this.props.filteredUsers) {
      this.setMarkers(null, prevProps.users)
      console.log('difeerent')
    }
    { 
      /*console.log(`prevProps: ${prevProps.filteredUsers} \n props.filteredUsers: ${this.props.filteredUsers}`)
    if (this.props.filteredUsers !== prevProps.filteredUsers) {
      console.log('can call google maps!')
    }
  console.log(`Filtered from didUpdate: \n boolean:${this.props.filteredUsers.length >= 1} \n value: ${this.props.filteredUsers}`)*/}
  }
  
  renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyARW8_P5byg0dhnLlZkraFBi6X_PmMshQQ&v=3&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    const _map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.420830, lng: -119.698189},
      zoom: 13
    })
    console.log(`from initMap: \n filteredUsers? ${this.props.filteredUsers.length >= 1} \n map: ${_map}`)
    this.makeMarkers(_map)
  }

  makeMarkers = (map) =>{
    let marker
    this.props.users.forEach(user => {
        console.log("makemarker")
        marker = new window.google.maps.Marker({
        position: user.position,
        map: map,
        title: user.dessert})
      this.setState({markers: [...this.state.markers, marker]})
    })
    console.log(` state.markers from makeMarkers: ${this.state.markers}`)
  }
    
  setMarkers = (map, markers) => {
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