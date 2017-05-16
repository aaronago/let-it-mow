import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/index';
import { Link } from 'react-router-dom';
import * as Cookies from 'js-cookie';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let isLoggedIn;

    if(!Cookies.get('accessToken')) {
      isLoggedIn = (
        <a href={'/api/auth/google'}>Login with Google</a>
      );
    } else {
      isLoggedIn = (
        <a href={'/api/auth/logout'}>Log Out</a>
      );
    }

    return (
      <div>
        <nav className="flex-nav">
          <ul>
            <li><Link to='/'><h1>Let it mow</h1></Link></li>
            <li className="right">{isLoggedIn}</li>
            <li className="right">
              <Link to={`/mylistings/`}>Rent your equipment</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  name: state.listings.name
});

export default connect(mapStateToProps)(Header);
