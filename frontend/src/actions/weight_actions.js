import { addWeight } from '../util/weight_api_util';

export const RECEIVE_WEIGHT = 'RECEIVE_WEIGHT';

export const receiveWeight = newWeight => ({
  type: RECEIVE_WEIGHT,
  newWeight
});

export const addNewWeight = newWeight => dispatch => (
  addWeight(newWeight)
    .then(weight => dispatch(receiveWeight(weight)))
    .catch(err => console.log(err))
);