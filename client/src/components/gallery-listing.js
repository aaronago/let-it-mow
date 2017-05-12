import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GalleryListing extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="gallery-listing">
        <Link to={`/listings/${this.props.id}`}>
          <div>
            <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${this.props.images[0]}.jpg`}/>
            <p>{this.props.title}</p>
            <p>Only ${this.props.price} to rent</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default GalleryListing;
