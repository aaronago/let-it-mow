import * as actions from '../actions/index';

const initialState = {
  name: '',
  images: [],
  categories: [],
  location: ''
  

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
      categories: action.categories,
      images: action.images,
      title: action.title,
      location: action.location

    }
  }
  return state;
}
