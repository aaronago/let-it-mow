import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { createListing } from '../actions/index';
import request from 'superagent';
import ImgUpload from './image-uploader';
import PreviewImage from './preview-image';
import PreviewText from './preview-text';



const CLOUDINARY_UPLOAD_PRESET = 'e6ai6rw0';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/letitmow/upload';

class AddItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      public_ids: [],
      renderText: false
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.previewText = this.previewText.bind(this);
  }

  renderField({input, label, type, textarea, placeholder, meta: { touched, error } }) {
    const textareaType = <textarea className="textarea" {...input} placeholder={placeholder} type={type} />;
    const inputType = <input className="input" {...input} placeholder={placeholder} type={type} />;
    return (
      <div className="form-field">
        <label className="form-label">{label}</label>
        <div>
          {textarea ? textareaType : inputType}
          <div className="field-msg">
            {touched ? error : ''}
          </div>
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
          public_ids: [...this.state.public_ids, res.body.public_id],
          renderText: true
        });
      }
    });
  }

  onSubmit(values) {
    const {createListing, onClick, reset} = this.props;
    values.images = this.state.public_ids;
    return createListing(values).then(() => {
      onClick();
      reset();
      this.setState({
        public_ids: [],
        renderText: false
      });
    });
  }

  resetForm() {
    this.props.reset();
    this.setState({
      public_ids: [],
      renderText: false
    });
  }

  previewText() {
    let formValues = '';
    if (this.state.renderText && this.props.formValues) {
      formValues = <PreviewText formValues={this.props.formValues} />;
    }
    return formValues;
  }

  render() {
    const gallery = this.state.public_ids.map(id => {
      return <PreviewImage key={id} id={id} />;
    });

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className="row form">
        <form className="submit-data col-5" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2 className='dash-stat dash-title'>Listing Form</h2>
          <div className="form-controls">
            <Field
              name="title"
              type="text"
              component={this.renderField}
              label="Item for Rent"
              placeholder="Mower"
            />

            <Field
              name="price"
              type="number"
              component={this.renderField}
              label="Price per Day"
              placeholder="20"
            />

            <Field
              name="description"
              type="text"
              textarea={true}
              component={this.renderField}
              label="Description"
              placeholder="5 hp, 21 in mower"
            />

            <Field
              name="zipcode"
              type="number"
              component={this.renderField}
              label="Your Zip"
              placeholder="Enter Your Zip"
            />

            <div className="form-field">
              <ImgUpload handleImageUpload={this.handleImageUpload}/>
            </div>
            <div className="btn-holder">
              <button className="btn-square btn-form"
                type="submit" disabled={submitting}>Submit</button>
              <button className="btn-square btn-form"
                type="button" disabled={pristine || submitting} onClick={this.resetForm}>
                Clear Form
              </button>
            </div>
          </div>
        </form>
        <div className="preview-gallery col-6">
          <h2 className='dash-stat dash-title'>Listing Preview</h2>
          <div className="preview-images">{gallery}</div>
          <div className="preview-text">{this.previewText()}</div>

        </div>
    </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Item required';
  }
  if (!values.price) {
    errors.price = 'Price Required';
  }
  if (!values.description) {
    errors.description = 'Description required';
  }
  if(!values.zipcode || values.zipcode.length < 5) {
    errors.zipcode = '5 digit Zip required';
  }
  return errors;
}

export default reduxForm({
  form: 'addItem', // a unique identifier for this form
  validate
})(
    connect(state => ({
      formValues: getFormValues('addItem')(state)
    }), { createListing }
  )(AddItemForm)
);
