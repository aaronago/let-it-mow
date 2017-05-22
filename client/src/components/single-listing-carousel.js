import React, { Component } from 'react';
import Slider from 'react-slick';



class Carousel extends Component {

  render() {
    const settings = {
      dots: true,
      slidesToShow: 1
      }
  console.log(this.props.images)
  const image = this.props.images.map((item) => {

     return (
         <div>
         <img src={`http://res.cloudinary.com/letitmow/image/w_700,h_700/upload/${item[0]}.jpg`}/>
         </div>
     )
  })
   return (
     <div className='carousel-container'>
        {image}
     </div>

   )
  }
}

// `http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listing.images[0]}.jpg`

export default(Carousel);
