import React, {Component} from 'react'

class AppMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
    
    }
  }

  componentDidMount = () => {
    this.renderMap()
  }
  
  componentDidUpdate = (prevProps) => {
    if (prevProps.currentUsers !== this.props.currentUsers) {
      this.props.setMarkers(null, prevProps.markers)
      this.props.makeMarkers(this.props.map)
      this.props.makeInfoWindows(this.props.markers)
    }
  }
  
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyARW8_P5byg0dhnLlZkraFBi6X_PmMshQQ&v=3&callback=initMap")
    window.initMap = this.props.initMap
  }

  render() {
   
    return (
      <main className="mapContainer">
        <div role="application" aria-label="google maps" id="map">LOADING</div>
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