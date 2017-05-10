import React from 'react';
import { Field, reduxForm } from 'redux-form';

const AddItemForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Item Category</label>
        <div>
          <Field name="itemCategory" component="select">
            <option />
            <option value="">Mowers</option>
            <option value="">Tillers</option>
            <option value="">Hoes</option>
          </Field>
        </div>
      </div>
      <div>
        <label>Price per Day</label>
        <div>
          <Field
            name="pricePerDay"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Product Description Link</label>
        <div>
          <Field
            name="productDescriptionLink"
            component="input"
            type="email"
            placeholder="Product Description Link"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'addItem', // a unique identifier for this form
})(AddItemForm);
