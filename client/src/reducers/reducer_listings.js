import * as actions from '../actions/index';

const initialState = {
  name: '',
  userId: '',
  error: '',
  listings: [],
  singleListing: [],
  userListings: []
};

export default (state=initialState, action) => {
  switch (action.type) {
      case actions.FETCH_USER_SUCCESS:
        console.log('action name', action.name);
        return { ...state,
                 name: action.name,
                 userId: action.userId,
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
      case actions.FETCH_LISTING_SUCCESS:
        return { ...state,
          [action.listing._id]: action.listing};

      case actions.FETCH_USER_LISTINGS_SUCCESS:
        return {...state,
          userListings: action.userListings
        };
  }
  return state;
};
