import axios from 'axios';

export const fetchUser = (userId) => {
  return axios.get(`/api/users/profile/${userId}`);
};

// export const updateBodyWeight = weight => {
//   return axios.patch(`/api/users/profile/:user_id/bodyweight`)
// }