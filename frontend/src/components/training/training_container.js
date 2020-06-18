import { connect } from 'react-redux';
import { fetchExercises } from '../../actions/exercise_actions';
import Training from './training.jsx';

const mSTP = state => {
  return {
    exercises: state.entities.exercises,
  }
};

const mDTP = dispatch => ({
  fetchExercises: () => dispatch(fetchExercises()),
});

export default connect(mSTP, mDTP)(Training);