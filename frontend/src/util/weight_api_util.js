import axios from 'axios';

export const addWeight = (newWeight) => {
  return axios.post(`/users/${newWeight.user}/bodyweight`, newWeight);
};