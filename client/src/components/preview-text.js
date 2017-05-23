import React from 'react';

const PreviewText = (props) => {
  const preview = props.formValues;
  return (
    <div>
      <p>{preview.title}</p>
      <p>${preview.price} /day to rent</p>
      <p>{preview.description}</p>
    </div>
  );
};

export default PreviewText;
