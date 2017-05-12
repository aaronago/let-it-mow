import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListing } from '../actions';

class SingleListingPage extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log('this is the id' + this.props.match.params.id);
    this.props.fetchListing(id);
  }


  render() {
    const { listing } = this.props;
    if(!listing) {
      return <div>...Loading</div>;
    }

    return (
      <div className="list-item">
        <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listing.images[0]}.jpg`}/>
        <p>{listing.title}</p>
        <p>Only ${listing.price} to rent</p>
      </div>

    );
  }
}

const mapStateToProps = ({ listings }, ownProps) => ({
  listing: listings[ownProps.match.params.id]
});

export default connect(mapStateToProps, { fetchListing })(SingleListingPage);
