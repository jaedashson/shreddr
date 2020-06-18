import { combineReducers } from 'redux';
import users from "./user_reducer";
import bodyweights from './bodyweight_reducer';
import exercises from './exercise_reducer';

const entitiesReducer = combineReducers({
  users,
  bodyweights,
  exercises
});

export default entitiesReducer;