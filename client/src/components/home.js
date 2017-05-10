import React from 'react';
import * as Cookies from 'js-cookie';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {browswerHistory} from 'react-router';
import Map from './map'
import GeoMap from './geolocation'
import Items from './items'



const mapStateToProps = (state,props) => ({
      name: state.name
})

export class Home extends React.Component {

    componentDidMount() {
      this.props.dispatch(actions.fetchUser());
    }
    render() {
        return (
            <div>
            <GeoMap/>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Home);
