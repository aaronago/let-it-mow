import React from 'react';
import * as Cookies from 'js-cookie';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {browswerHistory} from 'react-router';
import Map from './map'
import GeoMap from './geolocation'
import Items from './items'



const mapStateToProps = (state,props) => ({
      name: state.name,
      listings: state.listings
})

export class Home extends React.Component {

    componentDidMount() {
      this.props.dispatch(actions.fetchUser());
      this.props.dispatch(actions.fetchListings());
    }
    render() {
      console.log(this.props.listings)
        return (
            <div>
            <GeoMap/>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Home);
