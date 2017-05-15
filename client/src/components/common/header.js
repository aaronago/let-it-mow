import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/index';
import { Link } from 'react-router-dom';

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
        <nav>
          <ul>
            <li><Link to='/'><h1>Let it mow</h1></Link></li>
            <li>
              <form>
                  <input type="text" name="renting" placeholder="What are you renting?" />
                  <span className="search-icon"></span>
              </form>
            </li>
            <li>
              <form>
                <input type="text" placeholder="Enter a zip code" />
                <span className="location-icon"></span>
              </form>
            </li>
            <li>{isLoggedIn}</li>
            <li>
              <Link to={`/mylistings/`}>
              <div>
                <a>Rent your equipment</a>
              </div>
              </Link>
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
