import axios from 'axios';

export const addProgressPic = (formData, userId) => {
    return axios.post(`/api/progressPics/${userId}`, formData);
}

export const getProgressPic = userId => {
    return axios.get(`/api/progressPics/${userId}`);
}