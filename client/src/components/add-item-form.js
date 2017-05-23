import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
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

  renderField({input, label, type, textarea, placeholder, meta: { touched, error } }) {
    const textareaType = <textarea {...input} placeholder={placeholder} type={type} />;
    const inputType = <input {...input} placeholder={placeholder} type={type} />;
    return (
      <div>
        <label>{label}</label>
        <div>
          {textarea ? textareaType : inputType}
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
    const {createListing, onClick, reset} = this.props;
    values.images = this.state.public_ids;
    return createListing(values).then(() => {
      onClick();
      reset();
      this.setState({
        public_ids: []
      });
    });
  }

  render() {
    const gallery = this.state.public_ids.map(id => {
      console.log(this.props.formValues)
      return <PreviewImage key={id} id={id} />;
    });

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className="form">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

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

          <div>
            <ImgUpload handleImageUpload={this.handleImageUpload}/>
          </div>
          <div>
            <button className='btn-square'
              type="submit" disabled={submitting}>Submit</button>
            <button className='btn-square'
              type="button" disabled={pristine || submitting} onClick={reset}>
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
  if (!values.title) {
    errors.title = 'Please enter an Item Name';
  }
  if (!values.price) {
    errors.price = 'Please enter a Price';
  }
  if (!values.description) {
    errors.description = 'Please enter a Description';
  }
  if(!values.zipcode || values.zipcode.length < 5) {
    errors.zipcode = 'Please enter a valid 5 digit Zip';
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
