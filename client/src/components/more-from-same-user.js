import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MoreFromUser extends Component {
  constructor(props){
    super(props);

  }

 componentDidMount() {
    this.props.dispatch(actions.fetchMoreFromUser(this.props.userId));
  }

  render() {
    console.log('Props', this.props.allFromSameUser);
    let listItems = this.props.allFromSameUser;

    listItems = this.props.allFromSameUser.map (listItem => {
      console.log('listItem', listItem);
      return (
        <div key={listItem._id}>
          <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listItem.images[0]}.jpg`}/>
          <p>{listItem.title}</p>
          <p>Only ${listItem.price} to rent</p>
        </div>
      );
    });

    console.log('listItems', listItems);
    return (
      <div className="all-listings-from-user">
        <h2>All listings from this seller</h2>
            {listItems}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  allFromSameUser: state.listings.allFromSameUser
});


export default connect(mapStateToProps)(MoreFromUser);
