import React from 'react';

const PreviewImage = (props) => {
  return (
    <div>
      <img src={`http://res.cloudinary.com/letitmow/image/upload/w_150,h_100/${props.id}.jpg`}/>
    </div>
  );
};

export default PreviewImage;
