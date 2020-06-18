import { RECEIVE_ALL_EXERCISES } from '../actions/exercise_actions';

const ExerciseReducer = (state = {}, action) => {
  Object.freeze(state);
  // let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_EXERCISES:
      return action.exercises.data;
    default:
      return state;
  }
};

export default ExerciseReducer;