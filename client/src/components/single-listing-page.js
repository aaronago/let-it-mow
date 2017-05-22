import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListing, startConversation } from '../actions';
import Carousel from './single-listing-carousel';
import MoreFromSeller from './more-from-seller';



class SingleListingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchListing(id);
  }

  onInputChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      listingId: this.props.listing._id,
      createdBy: this.props.listing.createdBy._id,
      message: this.state.text
    };
    this.props.startConversation(data);
    this.setState({text: ''});
  }

  render() {
    const { listing } = this.props;
    if(!listing) {
      return <div>...Loading</div>;
    }

    return (
      <div>
          <Carousel images={listing.images}/>
        <div className='single-listing-form'>
        <p>{listing.title}</p>
        <p>Only ${listing.price} to rent</p>
          <form action="" onSubmit={this.onSubmit}>
            <label htmlFor="Start Chat">Start Chat</label>
            <input type="text" onChange={this.onInputChange}/>
            <input className='btn-square'type="submit" value={`Chat with ${listing.createdBy.name}`}/>
          </form>
        </div>
        <div className='more-from-seller'>
          <MoreFromSeller userId={listing.createdBy} picId={this.props.match.params}/>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ listings }, ownProps) => ({
  listing: listings[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchListing, startConversation })(SingleListingPage);
