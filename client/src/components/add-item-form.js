import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createListing } from '../actions/index';

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

  onSubmit(values) {
    this.props.createListing(values)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <Field
          name="itemCategory"
          type="text"
          component={this.renderField}
          label="Item"
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
          name="productDescriptionLink"
          type="text"
          component={this.renderField}
          label="Production Description Link"
          placeholder="http://www.awesome.product"
        />

        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.itemCategory) {
    errors.itemCategory = 'Required'
  }
  if (!values.pricePerDay) {
    errors.pricePerDay = 'Required'
  }
  if (!values.productDescriptionLink) {
    errors.productDescriptionLink = 'Required'
  }
  return errors
}

export default reduxForm({
  form: 'addItem', // a unique identifier for this form
  validate
})(
  connect(null,{ createListing })(AddItemForm)
)
