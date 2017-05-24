import * as actions from '../actions/index';

const initialState = {
  name: '',
  userId: '',
  error: '',
  listings: [],
  singleListing: [],
  userListings: [],
  createdBy: '',
  allFromSeller: []
};

export default (state=initialState, action) => {
  switch (action.type) {
      case actions.FETCH_USER_SUCCESS:
        return { ...state,
                 name: action.name,
                 userId: action.userId,
                 error: null,
                 _id: action._id
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
      case actions.FETCH_MORE_FROM_SELLER_SUCCESS:
        return { ...state,
                 allFromSeller: action.allUserListings
               };
  }
  return state;
};
