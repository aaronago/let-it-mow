import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import UserItem from './user-item';
import Header from './common/header'


class UserListings extends Component {
  constructor(props){
    super(props);

  }

 componentDidMount() {
    this.props.dispatch(actions.fetchUserListings());
  }


  render() {

    const listItem = this.props.userListings.map (listItem => {
      return (
        <div key={listItem._id}>
          <UserItem userId={listItem.createdBy} images={listItem.images} title={listItem.title}
           price={listItem.price} id={listItem._id} />
        </div>
      );
    });
    return (
      <div className="user-listings">
      <Header />
      <h2>Personal User Items</h2>
        {listItem}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userListings: state.listings.userListings,
  userId: state.listings.userId
});


export default connect(mapStateToProps)(UserListings);
