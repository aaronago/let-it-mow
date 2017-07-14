import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListing, startConversation } from '../actions';
import MoreFromSeller from './more-from-seller';
import GoogleMapReact from 'google-map-react';
import FontAwesome from 'react-fontawesome';
import Footer from './common/footer';
import moment from 'moment';
import ListingHeaderCard from './listing-header-card.js';

class SingleListingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    };
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


    const time = listing.createdAt;
    const sent = moment(time).fromNow();

    const position = listing.geometry.coordinates;


    return (
      <div className='row single-item-listings-container'>
        <div className='col-6'>
          <img className='single-item-image' src={`http://res.cloudinary.com/letitmow/image/upload/w_500,q_auto,fl_any_format,c_scale/${listing.images[0]}.jpg`}
          alt={listing.title}/>
          <h4 className='all-items-seller-heading single-item-des'>DESCRIPTION</h4>
          <p className='single-des-p'>{listing.description}</p>
          <div className='static-map'>
          <GoogleMapReact
            defaultCenter={{lat: position[1], lng: position[0]}}
            defaultZoom={13}>
          </GoogleMapReact>
          </div>
        <h4 className='all-items-seller-heading single-item-des'>SHARE THIS PRODUCT</h4>
        <a href='https://github.com/Jean-Luc19/let-it-mow' className='twitter-logo faicon' aria-label="click to tweet about this listing">
          <FontAwesome className='fa fa-twitter-square' size='3x' aria-hidden='true'/></a>
        <a href='https://github.com/Jean-Luc19/let-it-mow' className='facebook-logo faicon' aria-label="click to share this listing on facebook">
          <FontAwesome className='fa fa-facebook-square' size='3x' aria-hidden='true'/></a>
        <a href='https://github.com/Jean-Luc19/let-it-mow' className='email-logo faicon' aria-label="click to email this user about this listing">
          <FontAwesome className='fa fa-envelope-square' size='3x' aria-hidden='true'/></a>
        </div>
      <div className='col-6 user-listings-container'>
        <ListingHeaderCard listing={listing}/>
        <h4 className='all-items-seller-heading'><strong>ALL ITEMS FROM RENTER</strong></h4>
          <MoreFromSeller className='more-seller' userId={listing.createdBy} picId={this.props.match.params}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ listings }, ownProps) => ({
  listing: listings[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchListing, startConversation })(SingleListingPage);
