import React, { Component } from 'react';

class ListItem extends Component {
  constructor(props){
    super(props);
  }


  render() {

    return (
      <div className="list-item">
        <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${this.props.images[0]}.jpg`}/>
        <p>{this.props.title}</p>
        <p>Only ${this.props.price} to rent</p>
      </div>
    );
  }
}

export default ListItem;
