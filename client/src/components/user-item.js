import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {deleteListing} from '../actions';
import { connect } from 'react-redux';


class UserItem extends Component {
  constructor(props){
    super(props);
  }



  render() {
    return (

      <div className="user-item single-list-item">
        <Link to={`/listings/${this.props.id}`}>
          <div>
            <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${this.props.images[0]}.jpg`}/>
            <p className='more-seller-item-title'>{this.props.title}</p>
            <p className='more-seller-price'>${this.props.price} / Day</p>
          </div>
        </Link>
          <div>
            <button onClick={()=>this.props.deleteListing(this.props.userId,this.props.id)}
              type='button' className='btn-square'>Delete Item</button>
          </div>
      </div>
    );
  }
}


export default connect(null,{deleteListing})(UserItem);
