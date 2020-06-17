import { RECEIVE_WEIGHT } from '../actions/bodyweight_actions';

const BodyweightReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_WEIGHT:
      newState[action.bodyweight.data._id] = action.bodyweight.data;
      return newState;
    default:
      return state;
  }
};

export default BodyweightReducer;