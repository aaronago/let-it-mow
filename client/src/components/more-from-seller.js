import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MoreFromSeller extends Component {
  constructor(props){
    super(props);

  }

 componentDidMount() {
    this.props.dispatch(actions.fetchMoreFromSeller(this.props.userId));
  }

  render() {
    console.log('Props', this.props.allFromSeller);
    let listItems = this.props.allFromSeller;

    listItems = this.props.allFromSeller.map (listItem => {
      console.log('listItem', listItem);
      return (
        <div key={listItem._id}>
          <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listItem.images[0]}.jpg`}/>
          <p>{listItem.title}</p>
          <p>Only ${listItem.price} to rent</p>
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
