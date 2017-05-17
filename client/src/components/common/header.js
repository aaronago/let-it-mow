import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/index';
import { Link } from 'react-router-dom';
import img from './let-it-mow-logo.png';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut(e) {
    this.props.dispatch(logout());
  }

  render() {

    let isLoggedIn;

    if(!this.props.name) {
      isLoggedIn = (
        <a href={'/api/auth/google'}>Login with Google</a>
      );
    } else {
      isLoggedIn = (
        <a onClick={this.logOut} href='#'>Log Out</a>
      );
    }

    return (
      <div>
        <nav className="flex-nav">
          <ul>
            <li className="one"><Link to='/'><img src={img} /></Link></li>
            <li className="two">{isLoggedIn}</li>
            <li className="three">
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
