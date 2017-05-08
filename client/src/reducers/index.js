import * as actions from '../actions/index';

const initialState = {
  name: '',

}
export default (state=initialState, action) => {
  if (action.type === actions.FETCH_USER_SUCCESS){
    return {...state,
      name: action.name,
      error: null,
    }
  }
  return state;
}
