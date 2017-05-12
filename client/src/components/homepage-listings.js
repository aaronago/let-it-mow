import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryListing from './gallery-listing';

class HomepageListings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cards = this.props.listings.map (card => {
      return (
        <div key={card._id}>
          <GalleryListing images={card.images} title={card.title} price={card.price} id={card._id}/>
        </div>
      );
    });
    return (
      <div className="listings-gallery">
        {cards}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  listings: state.listings.listings
});

export default connect(mapStateToProps)(HomepageListings);
