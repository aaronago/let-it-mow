import React from 'react';
import Map from './map'
import Items from './items'

class GeoMap extends React.Component {
  render() {

    const markers = [ {
      location: {
        lat: 39.0115333,
        lng: -121.071746
      },
    },
    {
      location: {
        lat: 39.0039698,
        lng: -121.0493795
      },
    }
    ]
    return (
          <div>
           <Map
             markers={markers}
             center={{lat: 39.0039698,lng: -121.0493795 }}
             containerElement={<div style={{ height: 1500, width: '70%' }} />}
             mapElement={<div style={{ height: '80%', width: '80%'}} />                       }
            />
          </div>
    )
  }
}

export default(GeoMap);
