import React from 'react'
import {withGoogleMap, GoogleMap, Marker,InfoWindow} from 'react-google-maps'



class Map extends React.Component {

  render() {

    const markers = this.props.markers.map((item, i) => {
      const marker = {
        position: {
          lat: item.location.lat,
          lng: item.location.lng
        }
      }
      return <Marker key={i} {...marker}>
      <InfoWindow>this is info</InfoWindow>
      </Marker>
    })

    return (
      <div>
      <h1> This is the Google Map</h1>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={this.props.center}
        >
        {markers}
      </GoogleMap>
      </div>
    )
  }
}

export default withGoogleMap(Map)
