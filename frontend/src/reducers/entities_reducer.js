import { combineReducers } from 'redux';
import users from "./user_reducer";
import bodyweights from './bodyweight_reducer';

const entitiesReducer = combineReducers({
  users,
  bodyweights,
});

export default entitiesReducer;