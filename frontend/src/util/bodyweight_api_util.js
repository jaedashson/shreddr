import axios from 'axios';

export const addWeight = (newWeight) => {
  return axios.post(`/api/bodyweights/${newWeight.user}`, newWeight);
};

export const getUserWeights = userId => {
  return axios.get(`/api/bodyweights/${userId}`);
};