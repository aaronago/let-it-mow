import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends Component {

  constructor() {
    super();
    this.state={
      showInfo: false
    };
    this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
  }

  toggleInfoWindow() {
    this.setState({showInfo:!this.state.showInfo});
  }

  render() {

    const markers = this.props.markers.map((item, i) => {

      const marker = {
        position: {
          lat: item.position.lat,
          lng: item.position.lon
        },
          title: item.title,
          price: `${item.price}/day`,
          images: `http://res.cloudinary.com/letitmow/image/upload/w_40,h_40/${item.images[0]}.jpg`,
      };
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
    });

    return (
      <div className='main-map'>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={this.props.center}
        >
        {markers}
      </GoogleMap>
      </div>
    );
  }
}


export default withGoogleMap(Map);
