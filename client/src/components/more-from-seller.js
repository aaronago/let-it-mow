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
    listItems = this.props.allFromSeller.map (listItem => {
      if (listItem._id !==  this.props.picId.id) {
        return (
          <div className='single-list-item-key' key={listItem._id}>
            <Link className='more-seller-link' to={`/listings/${listItem._id}`} onClick={this.handleClick}>
              <img className='more-seller-thumbnail' src={`http://res.cloudinary.com/letitmow/image/upload/w_175,h_200/${listItem.images[0]}.jpg`}/>
              <p className='more-seller-item-title'>{listItem.title}</p>
              <p className='more-seller-price'>${listItem.price} / Day</p>
            </Link>
          </div>
        );
      } else {
        return;
      }
    });

    return (
      <div className="all-listings-from-user">
        <img className='profile-pic-single' src={this.props.userId.profilePic}/>
        <h4 className='more-seller-name'>{this.props.userId.name}</h4>
        <div className='more-seller-container'>
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
