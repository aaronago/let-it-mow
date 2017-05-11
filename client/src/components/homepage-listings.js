import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from './list-item';

class HomepageListings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cards = this.props.listings.map (card => {
      return (
        <div key={card._id}>
          <ListItem images={card.images} title={card.title} price={card.price} id={card._id}/>
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
