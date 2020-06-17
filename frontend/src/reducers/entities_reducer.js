import { combineReducers } from 'redux';
import users from "./user_reducer";
import weights from './weight_reducer';

const entitiesReducer = combineReducers({
  users,
  weights,
});

export default entitiesReducer;