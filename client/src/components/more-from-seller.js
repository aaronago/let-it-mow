import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import moment from 'moment';

class MoreFromSeller extends Component {
  constructor(props){
    super(props);
    this.moments = this.moments.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchMoreFromSeller(this.props.userId));
  }

   handleClick() {
    const { id } = this.props.match.params;
    this.props.fetchListing(id);
  }
   moments(time) {
    if(time.charAt(0) === 'a') {
      var day = time.replace(time.charAt(0),'1')
      return day.charAt(0) + day.charAt(2)
    }
    if(time.charAt(1) !== " ") {
      return time.charAt(0)+ time.charAt(1) + time.charAt(3)
    }
      return time.charAt(0) + time.charAt(2)
  }

  render() {
    let listItems = this.props.allFromSeller;
    listItems = this.props.allFromSeller.map (listItem => {
      const time = listItem.createdAt;
      const sent = moment(time).fromNow();
      if (listItem._id !==  this.props.picId.id) {
        return (
          <div className='single-list-item-key' key={listItem._id}>
            <Link className='more-seller-link' to={`/listings/${listItem._id}`} onClick={this.handleClick}>
             <div className='wrapper-ribbon'>
              <img className='more-seller-thumbnail' src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listItem.images[0]}.jpg`}/>
              <span className='corner-ribbon bottom-right sticky green shadow'>{this.moments(sent)}</span>
             </div>
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
