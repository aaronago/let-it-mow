import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as Cookies from 'js-cookie';
import img from './let-it-mow-logo.png';


export class Header extends Component {

  render() {

    let isLoggedIn;
    let rentLink;
    let loginMsg;

    if(!Cookies.get('accessToken')) {
      rentLink = 'hidden';
      loginMsg = '';
      isLoggedIn = (
        <a className="btn-square"
          href={'/api/auth/google'}>Login with Google</a>
      );
    } else {
      rentLink = '';
      loginMsg = 'hidden';
      isLoggedIn = (
        <a className='btn-square'
          href={'/api/auth/logout'}>Log Out</a>
      );
    }

    return (

      <div>
        <nav className="flex-nav">
          <ul className="logo">
            <li><Link to='/'><img src={img} /></Link></li>
          </ul>
          <ul className="buttons">
            <li>{isLoggedIn}</li>
            <li>
              <div className={rentLink} >
                <Link className="btn-square"
                  to={`/mylistings/`}>Dashboard</Link>
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
