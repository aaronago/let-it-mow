import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GalleryListing extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="col-2">
        <Link to={`/listings/${this.props.id}`}>

            <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${this.props.images[0]}.jpg`}/>
            <p className='more-seller-item-title'>{this.props.title}</p>
            <p className='more-seller-price'>${this.props.price} / Day</p>

        </Link>
      </div>
    );
  }
}

export default GalleryListing;
