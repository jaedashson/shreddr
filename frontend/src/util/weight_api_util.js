import axios from 'axios';

export const addWeight = (newWeight) => {
  return axios.post(`/users/${weight.user}/bodyweight`, newWeight);
};