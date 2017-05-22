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

            <img src={`http://res.cloudinary.com/letitmow/image/upload/w_250,h_200/${this.props.images[0]}.jpg`}/>
            <p>{this.props.title}</p>
            <p>Only ${this.props.price} to rent</p>

        </Link>
      </div>
    );
  }
}

export default GalleryListing;
