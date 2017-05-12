import * as actions from '../actions/index';

const initialState = {
  name: '',
  error: '',
  listings: [],
  singleListing: [],
};

export default (state=initialState, action) => {
  switch (action.type) {
      case actions.FETCH_USER_SUCCESS:
        console.log('action name', action.name);
        return { ...state,
                 name: action.name,
                 error: null,
               };
      case actions.LOGOUT:
        return { ...state,
                 name: ''
               };
      case actions.FETCH_LISTINGS_SUCCESS:
        return { ...state,
                 listings: action.listings
               };
  }
  return state;
};
