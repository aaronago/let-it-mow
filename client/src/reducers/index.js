import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ListingsReducer from './reducer_listings';
import ChatReducer from './reducer_chat';

const rootReducer = combineReducers ({
  listings: ListingsReducer,
  chat: ChatReducer,
  form: formReducer,
});

export default rootReducer;
