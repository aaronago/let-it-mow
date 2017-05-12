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
          <div>
            <tr>
              <td>
                <a href="#"><h1>Let it mow</h1></a>
              </td>
              <td>
                <form>
                  <div>
                    <input type="text" name="renting" placeholder="What are you renting?" />
                    <span className="search-icon"></span>
                  </div>
                  <div>
                    <input type="text" placeholder="Enter a zip code" />
                    <span className="location-icon"></span>
                  </div>
                </form>
              </td>
              <td>
              <div>
                {isLoggedIn}
              </div>
              <Link to={`/mylistings/`}>
              <div>
                <h3>Rent your equipment</h3>
              </div>
              </Link>
              </td>
            </tr>
          </div>
        </nav>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  name: state.listings.name
});

export default connect(mapStateToProps)(Header);
