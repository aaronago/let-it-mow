import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import UserItem from './user-item';
import Header from './common/header';
import AddItemForm from './add-item-form';
import * as Cookies from 'js-cookie';


class UserListings extends Component {
  constructor(props){
    super(props);
    this.state = {
      hidden: true
    };
    this.onClick = this.onClick.bind(this);
  }

 componentDidMount() {
    this.props.dispatch(actions.fetchUserListings());
  }

  onClick() {
    this.setState({hidden: !this.state.hidden});
  }

  render() {

    const disableLink = Cookies.get('accessToken') ? '' : 'disable-link';
    const show = Cookies.get('accessToken') ? 'hidden' : '';

    const hidden = this.state.hidden ? 'hidden' : '';
    const listings = this.props.userListings;
    const listItem = listings.length > 0 ? listings.map (listItem => {
      return (
        <div key={listItem._id}>
          <UserItem userId={listItem.createdBy} images={listItem.images} title={listItem.title}
           price={listItem.price} id={listItem._id} />
        </div>
      );
    }) :  <div>`You don't have any listings yet`</div>;


    return (
      <div className="user-listings">
        <div className={hidden}>
          <AddItemForm onClick={this.onClick}/>
        </div>
        <span className={show}>You are not currently logged in</span>
        <h2>Your Listings</h2>
        <button className={disableLink} onClick={this.onClick}>Add A New Listing!</button>
          <div className="listings-gallery">
            {listItem}
          </div>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userListings: state.listings.userListings,
  userId: state.listings.userId
});


export default connect(mapStateToProps)(UserListings);
