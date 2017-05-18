import * as actions from '../actions/index';

const initialState = {
  conversations: [],
  messages: []
};

export default (state=initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CONVERSATIONS_SUCCESS:
      return {...state, conversations: action.conversations};
    case actions.FETCH_CONVERSATION_SUCCESS:
      return {...state, messages: action.messages};
  }
  return state;
};
