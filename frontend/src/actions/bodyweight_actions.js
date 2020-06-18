import { addWeight, getUserWeights } from '../util/bodyweight_api_util';

export const RECEIVE_WEIGHT = 'RECEIVE_WEIGHT';
export const RECEIVE_WEIGHTS = 'RECEIVE_WEIGHTS';

export const receiveWeights = bodyweights => ({
  type: RECEIVE_WEIGHTS,
  bodyweights
});

export const receiveWeight = bodyweight => ({
  type: RECEIVE_WEIGHT,
  bodyweight
});

export const fetchUserWeights = userId => dispatch => (
  getUserWeights(userId)
    .then(weights => dispatch(receiveWeights(weights)))
    .catch(err => console.log(err))
);

export const addNewWeight = bodyweight => dispatch => (
  addWeight(bodyweight)
    .then(weight => dispatch(receiveWeight(weight)))
    .catch(err => console.log(err))
);