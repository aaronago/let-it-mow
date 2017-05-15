import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryListing from './gallery-listing';

class HomepageListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
      this.setState({searchString:e.target.value});
    }
  render() {

    let listings = this.props.listings
    let searchString = this.state.searchString.trim().toLowerCase();
    if(searchString.length > 0){
        listings = listings.filter(function(l){
        return l.title.toLowerCase().match(searchString);
        });
    }
    return (
      <div>
      <input type="text" value={this.state.searchString}
      onChange={this.handleChange} placeholder="Search Equipment"/>
      <div className="listings-gallery">
      {listings.map(card => {
        return (
          <div key={card._id}>
          <GalleryListing images={card.images} title={card.title}
           price={card.price} id={card._id}/>
       </div>)}
     )}
      </div>
      </div>
   )
  }
}

const mapStateToProps = (state, props) => ({
  listings: state.listings.listings
});

export default connect(mapStateToProps)(HomepageListings);
