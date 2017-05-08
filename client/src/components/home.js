import React from 'react';
import * as Cookies from 'js-cookie';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {browswerHistory} from 'react-router';

const mapStateToProps = (state,props) => ({
      name: state.name
})

export class Home extends React.Component {


    componentDidMount() {
      this.props.dispatch(actions.fetchUser());
    }

    render() {

        return (
            <div>This is home</div>
        );
    }
}

export default connect(mapStateToProps)(Home);
