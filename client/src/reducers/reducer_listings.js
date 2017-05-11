import * as actions from '../actions/index';

const initialState = {
  name: '',
  listings: [],
  singleListing: [],
};

export default (state=initialState, action) => {
  switch(action.type) {
    case actions.FETCH_USER_SUCCESS:
      return { ...state, name: action.name, error: null };
    case actions.FETCH_LISTINGS_SUCCESS:
      return { ...state, listings: action.listings };
    case actions.FETCH_LISTING_SUCCESS:
      return { ...state, [action.listing._id]: action.listing};
  }
  return state;
};
