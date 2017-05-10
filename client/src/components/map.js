import React from 'react'
import {withGoogleMap, GoogleMap, Marker,InfoWindow} from 'react-google-maps'
import Items from './items'



class Map extends React.Component {

  constructor() {
    super()
    this.state={
      showInfo: false
    }
    this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
  }


  toggleInfoWindow() {
    this.setState({showInfo:!this.state.showInfo})

  }



  render() {

    const markers = this.props.markers.map((item, i) => {

      const marker = {
        position: {
          lat: item.location.lat,
          lng: item.location.lng
        },
          title: 'Lawn Mower',
          price: "$10/day",
          images: './lawn_mower.jpg',

      }
      return <Marker
      key={i}
      onClick={this.toggleInfoWindow}
      {...marker}>
     {this.state.showInfo && (
      <InfoWindow
       onCloseClick={this.state.toggleInfoWindow}
       >
        <div>
          <h2>{marker.title}</h2>
          <img src={marker.images} />
          <h3>{marker.price}</h3>
        </div>
      </InfoWindow>
    )}
      </Marker>
    })

    return (
      <div className='main-map'>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={this.props.center}
        >
        {markers}
      </GoogleMap>
      <Items
       markers={this.props.markers}
       />
      </div>
    )
  }
}

export default withGoogleMap(Map)
