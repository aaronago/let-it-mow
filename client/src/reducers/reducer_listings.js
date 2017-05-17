import * as actions from '../actions/index';

const initialState = {
  name: '',
  userId: '',
  error: '',
  listings: [],
  singleListing: [],
  userListings: [],
  createdBy: '',
  allFromSameUser: []
};

export default (state=initialState, action) => {
  switch (action.type) {
      case actions.FETCH_USER_SUCCESS:
        return { ...state,
                 name: action.name,
                 userId: action.userId,
                 error: null,
               };
      case actions.FETCH_LISTINGS_SUCCESS:
        return { ...state,
                 listings: action.listings
               };
      case actions.FETCH_LISTING_SUCCESS:
        return { ...state,
                [action.listing._id]: action.listing,
                createdBy: action.createdBy
               };
      case actions.FETCH_USER_LISTINGS_SUCCESS:
        return { ...state,
                 userListings: action.userListings
               };
      case actions.FETCH_MORE_FROM_USER_LISTINGS_SUCCESS:
        return { ...state,
                 allFromSameUser: action.allUserListings
               };
  }
  return state;
};
