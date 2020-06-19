import { combineReducers } from 'redux';
import users from "./user_reducer";
import exercises from './exercise_reducer';

const entitiesReducer = combineReducers({
  users,
  exercises
});

export default entitiesReducer;