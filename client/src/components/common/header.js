import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as Cookies from 'js-cookie';

export class Header extends Component {
  
  render() {

    let isLoggedIn;
    let rentLink;
    let loginMsg;

    if(!Cookies.get('accessToken')) {
      rentLink = 'hidden';
      loginMsg = '';
      isLoggedIn = (
        <a href={'/api/auth/google'}>Login with Google</a>
      );
    } else {
      rentLink = '';
      loginMsg = 'hidden';
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
            <li className="right" onClick={this.authCheck}>
              <div className={rentLink} >
                <Link to={`/mylistings/`}>Rent your equipment</Link>
              </div>
            </li>
          </ul>
          <span className={loginMsg}>Please login to list and manage your rentals</span>
        </nav>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  name: state.listings.name
});

export default connect(mapStateToProps)(Header);
