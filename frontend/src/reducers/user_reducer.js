import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_WEIGHT, RECEIVE_WEIGHTS } from '../actions/bodyweight_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_WEIGHTS:
      newState[action.bodyweights.data[0].user].bodyweights = action.bodyweights.data;
      return newState;
    case RECEIVE_WEIGHT:
      newState[action.bodyweight.data.user].bodyweights.push(action.bodyweight.data);
      return newState;
    case RECEIVE_USER:
      // newState = action.user.data;
      newState[action.user.data._id] = action.user.data;
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
