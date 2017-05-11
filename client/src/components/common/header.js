import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {logout, login} from '../actions/index';

export class Header extends Component {
  constructor(props) {
    super(props);
    // this.logOut = this.logOut.bind(this);
    // this.logIn = this.logIn.bind(this);
  }

  // logOut(e) {
    //this.props.dispatch(logout());
  // }

  // logIn(e) {
    //this.props.dispatch(login());
  // }

  render() {
    // let isLoggedIn;
    //
    //   if(!this.props.name) {
    //     isLoggedIn = (
    //       <a href={'/api/auth/google'}>Login with Google</a>
    //     );
    //   } else {
    //     isLoggedIn = (
    //       <a onClick={this.logOut}>Log Out</a>
    //     );
    //   }

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
                    <span class="search-icon"></span>
                  </div>
                  <div>
                    <input type="text" placeholder="Enter a zip code" />
                    <span class="location-icon"></span>
                  </div>
                </form>
              </td>
              <td>
              <div>
                <a href={'/api/auth/google'}>Login with Google</a>
              </div>
              <div>
                <a href="#">Rent your equipment</a>
              </div>
              </td>
            </tr>
          </div>
        </nav>
      </div>
    );
  }
};

const mapStateToProps = (state,props) => ({
      name: state.name
});

export default connect(mapStateToProps)(Header);
