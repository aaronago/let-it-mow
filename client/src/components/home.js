import React from 'react';
import * as Cookies from 'js-cookie';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {browswerHistory} from 'react-router';
import PopUpInfoWindowExample from './map'
import Map from './map'

const mapStateToProps = (state,props) => ({
      name: state.name
})

export class Home extends React.Component {

    componentDidMount() {
      this.props.dispatch(actions.fetchUser());
    }
    render() {
        const location = {
          lat: 40.7575285,
          lng: -73.9884469
        }
        const markers = [ {
          location: {
            lat: 40.7575285,
            lng: -73.9884469
          },
        },
        {
          location: {
            lat: 40.7614133,
            lng: -73.9902608
          },
        }
        ]
        return (
            <div>
            <Map
             markers={markers}
             center={location}
             containerElement={<div style={{ height: 500 }} />}
             mapElement={<div style={{ height: 500}} />                       }
            />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Home);
