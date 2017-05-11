import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ListingsReducer from './reducer_listings';
import UserReducer from './user';

const rootReducer = combineReducers ({
  listings: ListingsReducer,
  form: formReducer,
  user: UserReducer,
});

export default rootReducer;
