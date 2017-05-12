import React, { Component } from 'react';


class UserListings extends Component {
  constructor(props){
    super(props);
  }

  


  render() {

    return (
      <div className="list-item">
        <h3 className="listing-title">Test Title</h3>
        <img src='img.png'/>
        <p>Test Description</p>
        <button type='submit' className='edit-button'>Edit Post</button>
        <button type='submit' className='delete-button>'>Delete Post</button>
      </div>

    );
  }
}



export default(UserListings);
