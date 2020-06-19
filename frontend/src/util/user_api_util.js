import axios from 'axios';

export const fetchUser = (userId) => {
  return axios.get(`/api/users/profile/${userId}`);
};

export const addProfilePic = (formData, userId) => {
  return axios.post(`api/users/${userId}/profilePic`, formData);
}

// export const updateBodyWeight = weight => {
//   return axios.patch(`/api/users/profile/:user_id/bodyweight`)
// }