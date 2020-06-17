import { RECEIVE_WEIGHT } from '../actions/weight_actions';

const WeightReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_WEIGHT:
      newState[action.newWeight.id] = action.newWeight;
      return newState;
    default:
      return state;
  }
};

export default WeightReducer;