import React, { Component } from 'react';
import Slider from 'react-slick';



class Carousel extends Component {

  render() {
    const settings = {
      dots: true,
      slidesToShow: 1,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      cssEase: 'linear'
    };

  const image = this.props.images.map((item,i) => {

     return (
         <div key={i}>
         <img src={`http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${item}.jpg`}/>
         </div>
     );
  });
   return (
     <div className='carousel-container'>
      <Slider {...settings}>
        {image}
      </Slider>
     </div>

   );
  }
}

// `http://res.cloudinary.com/letitmow/image/upload/w_200,h_200/${listing.images[0]}.jpg`

export default(Carousel);
