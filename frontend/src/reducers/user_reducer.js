
import { RECEIVE_USER } from '../actions/user_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
