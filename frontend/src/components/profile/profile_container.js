import { connect } from 'react-redux';
// import { closeModal, openModal } from '../../actions/modal_actions'
import Profile from './profile.jsx';
import { addNewWeight, fetchUserWeights } from '../../actions/bodyweight_actions';
import { fetchUserProfile } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  if (state.entities.users[ownProps.match.params.userId]) {
    return {
      currentUser: state.session.user,
      isAuthenticated: state.session.isAuthenticated,
      user: state.entities.users[ownProps.match.params.userId],
      userBodyweights: state.entities.users[ownProps.match.params.userId].bodyweights,
    }
  } else {
    return {
      currentUser: state.session.user,
      isAuthenticated: state.session.isAuthenticated,
      user: state.entities.users[ownProps.match.params.userId],
    }
  }
};

const mapDispatchToProps = dispatch => ({
  addNewWeight: newWeight => dispatch(addNewWeight(newWeight)),
  fetchUserWeights: userId => dispatch(fetchUserWeights(userId)),
  fetchUserProfile: userId => dispatch(fetchUserProfile(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);