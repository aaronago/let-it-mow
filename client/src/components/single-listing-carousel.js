import React, { Component } from 'react';
import Slider from 'react-slick';



class Carousel extends Component {

  render() {
    const settings = {
      dots: true,
      }
  console.log(this.props.images)
  const image = this.props.images.map((item,i) => {

     return (
         <div key={i}>
         <img src={`http://res.cloudinary.com/letitmow/image/upload/w_700,h_700,c_scale/${item}.jpg`}/>
         </div>
     )
  })
   return (
     <div className='carousel-container'>
      <Slider {...settings}>
        {image}
      </Slider>
     </div>

   )
  }
}

// `http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listing.images[0]}.jpg`

export default(Carousel);
