import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ListingsReducer from './reducer_listings';

const rootReducer = combineReducers ({
  listings: ListingsReducer,
  form: formReducer,
});

export default rootReducer;
