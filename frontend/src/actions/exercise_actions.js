import { getAllExercises } from '../util/exercise_api_util';

export const RECEIVE_ALL_EXERCISES = "RECEIVE_ALL_EXERCISES";

export const receiveAllExercises = exercises => ({
  type: RECEIVE_ALL_EXERCISES,
  exercises
})

export const fetchExercises = () => dispatch => (
  getAllExercises()
    .then(exercises => dispatch(receiveAllExercises(exercises)))
    .catch(err => console.log(err))
)