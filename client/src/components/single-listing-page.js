import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListing, fetchMoreFromUser } from '../actions';
import * as actions from '../actions';
import MoreFromUser from './more-from-same-user';
import Carousel from'./single-listing-carousel';

class SingleListingPage extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchListing(id);
  }


  render() {
    const { listing } = this.props;
    if(!listing) {
      return <div>...Loading</div>;
    }


    return (
      <div>
        <div>
          <Carousel images={listing.images}/>
          <p>{listing.title}</p>
          <p>Only ${listing.price} to rent</p>
        </div>
        <div>
          <MoreFromUser userId={listing.createdBy} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ listings }, ownProps) => ({
  listing: listings[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchListing })(SingleListingPage);
