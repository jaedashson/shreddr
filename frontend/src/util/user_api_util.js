import axios from 'axios';

export const fetchUser = (userId) => {
  return axios.get(`/profile/${userId}`);
};
