import { addWeight } from '../util/bodyweight_api_util';

export const RECEIVE_WEIGHT = 'RECEIVE_WEIGHT';

export const receiveWeight = bodyweight => ({
  type: RECEIVE_WEIGHT,
  bodyweight
});

export const addNewWeight = bodyweight => dispatch => (
  addWeight(bodyweight)
    .then(weight => dispatch(receiveWeight(weight)))
    .catch(err => console.log(err))
);