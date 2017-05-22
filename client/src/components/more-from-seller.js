import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class MoreFromSeller extends Component {
  constructor(props){
    super(props);

  }

 componentDidMount() {
    this.props.dispatch(actions.fetchMoreFromSeller(this.props.userId));
  }

  handleClick() {
    const { id } = this.props.match.params;
    this.props.fetchListing(id);
  }

  render() {
    let listItems = this.props.allFromSeller;
    console.log(this.props)
    listItems = this.props.allFromSeller.map (listItem => {
      if (listItem._id !==  this.props.picId.id) {
        return (
          <div className='single-list-item-key' key={listItem._id}>
            <Link to={`/listings/${listItem._id}`} onClick={this.handleClick}>
              <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listItem.images[0]}.jpg`}/>
              <p>{listItem.title}</p>
              <p>${listItem.price} / Day</p>
            </Link>
          </div>
        );
      } else {
        return;
      }
    });

    return (
      <div className="all-listings-from-user">
        <h4 className='all-items-seller-heading'><strong>ALL ITEMS FROM RENTER</strong></h4>
        <img className='profile-pic-single' src={this.props.userId.profilePic}/>
        <h4>{this.props.userId.name}</h4>
        <div>
            {listItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  allFromSeller: state.listings.allFromSeller
});


export default connect(mapStateToProps)(MoreFromSeller);
