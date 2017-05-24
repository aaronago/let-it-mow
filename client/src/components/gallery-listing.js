import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class GalleryListing extends Component {
  constructor(props){
    super(props);
    this.moments = this.moments.bind(this)
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
    const time = this.props.created
    const sent = moment(time).fromNow();
    console.log(sent)
    return (
      <div className="col-2">
        <Link to={`/listings/${this.props.id}`}>
            <div className='wrapper-ribbon'>
            <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${this.props.images[0]}.jpg`}/>
              <span className='corner-ribbon bottom-right sticky green shadow'>{this.moments(sent)}</span>
            </div>
            <p className='more-seller-item-title'>{this.props.title}</p>
            <p className='more-seller-price'>${this.props.price} / Day</p>

        </Link>
      </div>
    );
  }
}

export default GalleryListing;
