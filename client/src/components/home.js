import React, { Component } from 'react';
import * as Cookies from 'js-cookie';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {browswerHistory} from 'react-router';
import GeoMap from './map-components/geolocation';
import HomepageListings from './homepage-listings';



const mapStateToProps = (state,props) => ({
      name: state.name,
      listings: state.listings
});

export class Home extends Component {

    componentDidMount() {
      this.props.dispatch(actions.fetchUser());
      this.props.dispatch(actions.fetchListings());
    }
    render() {
        return (
            <div>
              <HomepageListings />
              <GeoMap />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Home);
