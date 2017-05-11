import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createListing } from '../actions/index';
import ImgUpload from './image-uploader';

class AddItemForm extends Component {

  renderField({input, label, type, placeholder, meta: { touched, error } }) {
    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={placeholder} type={type} />
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values, ) {
    this.props.createListing(values, )
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
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
          label="Price Per Day"
          placeholder="10"
        />

        <Field
          name="product_url"
          type="url"
          component={this.renderField}
          label="Product URL"
          placeholder="http://www.mower.com"
        />

        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
        <div>
          <ImgUpload />
        </div>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.itemName) {
    errors.itemName = 'Required'
  }
  if (!values.pricePerDay) {
    errors.pricePerDay = 'Required'
  }
  if (!values.product_url) {
    errors.product_url = 'Required'
  }
  return errors
}

export default reduxForm({
  form: 'addItem', // a unique identifier for this form
  validate
})(
  connect(null,{ createListing })(AddItemForm)
)
