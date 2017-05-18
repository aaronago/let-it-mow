import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class MoreFromSeller extends Component {
  constructor(props){
    super(props);

  }

 componentDidMount() {
    this.props.dispatch(actions.fetchMoreFromSeller(this.props.userId));
  }

  handleClick() {
    const { id } = this.props.match.params;
    this.props.fetchListing(id);
}

  render() {
    console.log('Props', this.props.allFromSeller);
    let listItems = this.props.allFromSeller;

    listItems = this.props.allFromSeller.map (listItem => {
      console.log('listItem ID', listItem._id);
      return (
        <div key={listItem._id}>
          <Link to={`/listings/${listItem._id}`} onClick={this.handleClick}>
            <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listItem.images[0]}.jpg`}/>
            <p>{listItem.title}</p>
            <p>Only ${listItem.price} to rent</p>
          </Link>
        </div>
      );
    });

    console.log('listItems', listItems);
    return (
      <div className="all-listings-from-user">
        <h2>All listings from this seller</h2>
            {listItems}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  allFromSeller: state.listings.allFromSeller
});


export default connect(mapStateToProps)(MoreFromSeller);
