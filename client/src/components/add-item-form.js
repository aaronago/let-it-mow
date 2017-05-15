import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createListing } from '../actions/index';
import request from 'superagent';
import ImgUpload from './image-uploader';
import PreviewImage from './preview-image';


const CLOUDINARY_UPLOAD_PRESET = 'e6ai6rw0';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/letitmow/upload';

class AddItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      public_ids: []
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  renderField({input, label, type, placeholder, meta: { touched, error } }) {
    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={placeholder} type={type} />
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, res) => {
      if (err) console.error(err);
      if (res.body.secure_url !== '') {
        this.setState({
          public_ids: [...this.state.public_ids, res.body.public_id]
        });
      }
    });

  }

  onSubmit(values) {
    values.images = this.state.public_ids;
    this.props.createListing(values);
    this.props.onClick();
  }

  render() {
    const gallery = this.state.public_ids.map(id => {
      return <PreviewImage key={id} id={id} />;
    });

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className="form">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

          <Field
            name="itemName"
            type="text"
            component={this.renderField}
            label="Item for Rent"
            placeholder="Mower"
          />

          <Field
            name="pricePerDay"
            type="number"
            component={this.renderField}
            label="Price per Day"
            placeholder="20"
          />

          <div>
            <label>Description</label>
            <div>
              <Field
                name="description"
                component="textarea"
                type="text"
                placeholder="5 hp, 21 in mower"
              />
            </div>
          </div>

          <Field
            name="product_url"
            type="url"
            component={this.renderField}
            label="Product URL"
            placeholder="http://www.mower.com"
          />
          
          <Field
            name="zipcode"
            type="text"
            component={this.renderField}
            label="Your Zip"
            placeholder="Enter Your Zip"
          />

          <div>
            <ImgUpload handleImageUpload={this.handleImageUpload}/>
          </div>
          <div>
            <button type="submit" disabled={submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>
        <div className="preview-gallery">
          {gallery}
        </div>
    </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.itemName) {
    errors.itemName = 'Required';
  }
  if (!values.pricePerDay) {
    errors.pricePerDay = 'Required';
  }
  if(!values.zipcode) {
    errors.zipcode = "Please Enter a Valid Zip";
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
}

export default reduxForm({
  form: 'addItem', // a unique identifier for this form
  validate
})(
  connect(null,{ createListing })(AddItemForm)
);
