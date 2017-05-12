import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListing } from '../actions';

class UserListings extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
  }


  render() {

    return (
      <div className="list-item">
        <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listing.images[0]}.jpg`}/>
        <p>{listing.title}</p>
        <p>Only ${listing.price} to rent</p>
      </div>

    );
  }
}

const mapStateToProps = ({ listings }, ownProps) => ({
  listing:
});

export default connect(mapStateToProps)(UserListings);
