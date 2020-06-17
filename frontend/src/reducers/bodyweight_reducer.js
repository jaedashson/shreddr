import { RECEIVE_WEIGHT } from '../actions/bodyweight_actions';

const WeightReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_WEIGHT:
      newState[action.newWeight.data._id] = action.newWeight.data;
      return newState;
    default:
      return state;
  }
};

export default WeightReducer;