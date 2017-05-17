import * as actions from '../actions/index';

const initialState = {
  conversations: []
};

export default (state=initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CONVERSATIONS_SUCCESS:
      return {...state, conversations: action.conversations};
  }
  return state;
};
