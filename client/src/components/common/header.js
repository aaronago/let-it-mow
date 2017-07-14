import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as Cookies from 'js-cookie';
import img from './let-it-mow-logo.png';
import FontAwesome from 'react-fontawesome';
import { fetchConversations } from '../../actions';



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

    const fetchConvoDebounced = _.debounce(() => {this.props.fetchConversations() ;}, 2000);

  const notify = this.props.unread > 0 ? 'ion-email-unread nav-chat-unread' : 'ion-ios-email-outline nav-chat-read';

    return (

      <div onMouseMove={fetchConvoDebounced}>
        <nav className="flex-nav">
          <ul className="logo">
            <li><Link to='/'><img src={img} alt="let it mow goat logo"/></Link></li>
          </ul>
          <ul className="nav-buttons">
            <li>
              <div >
                <Link to={`/chat`} aria-label="link your conversations on let it mow">
                    <i className={notify}></i>
                </Link>
              </div>
            </li>
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
  name: state.listings.name,
  unread: state.chat.unreadCount
});

export default connect(mapStateToProps, { fetchConversations })(Header);
