import * as actions from '../actions/index';

const initialState = {
  name: '',
  listings: [],
  singleListing: [],


}
export default (state=initialState, action) => {
  if (action.type === actions.FETCH_USER_SUCCESS){
    return {...state,
      name: action.name,
      error: null,
    }
  }
  if (action.type === actions.FETCH_LISTINGS_SUCCESS) {
    return {...state,
      listings: action.listings
    }
  }
  return state;
}
