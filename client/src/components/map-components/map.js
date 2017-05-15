import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';

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
          lat: item.geometry.coordinates[1],
          lng: item.geometry.coordinates[0]
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
        <Link to={`/listings/${item._id}`}>
          <div>
            <h5>{marker.title}</h5>
            <img src={marker.images} />
            <h5>{marker.price}</h5>
          </div>

        </Link>

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
