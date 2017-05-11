import React from 'react';
import { connect } from 'react-redux';
import Map from './map';
import Items from './items';

class GeoMap extends React.Component {
  render() {

    const markers = this.props.listings;
    return (
          <div className="listings-map">
           <Map
             markers={markers}
             center={{lat: 39.6989145,lng: -104.9808785 }}
             containerElement={<div style={{ height: 300, width: '100%' }} />}
             mapElement={<div style={{ height: '80%', width: '80%'}} />                       }
            />
          </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  listings: state.listings.listings
});


export default connect(mapStateToProps)(GeoMap);
