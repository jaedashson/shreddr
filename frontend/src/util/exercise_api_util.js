import axios from 'axios';

export const getAllExercises = () => {
  return axios.get('api/exercises');
}; 