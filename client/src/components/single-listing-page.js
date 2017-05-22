import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListing, startConversation } from '../actions';
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
      <div className='row single-item-listings-container'>
        <div className='col-6'>
          <img className='single-item-image' src={`http://res.cloudinary.com/letitmow/image/upload/w_500,h_700,c_scale/${listing.images[0]}.jpg`}/>
        </div>
      <div className='col-6 user-listings-container'>
        <h1>${listing.price} / Day</h1>
        <h2 className='single-listing-title'>{listing.title}</h2>
          <form action="" onSubmit={this.onSubmit}>
            <label htmlFor="Start Chat">Start Chat</label>
            <input type="text" onChange={this.onInputChange}/>
            <input className='btn-square chat-with-button'type="submit" value={`Chat with ${listing.createdBy.name}`}/>
          </form>
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
