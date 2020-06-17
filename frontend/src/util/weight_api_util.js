import axios from 'axios';

export const addWeight = (newWeight) => {
  return axios.post(`/api/users/${newWeight.user}/bodyweight`, newWeight);
};