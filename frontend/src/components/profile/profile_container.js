import { connect } from 'react-redux';
// import { closeModal, openModal } from '../../actions/modal_actions'
import Profile from './profile.jsx';
import { addNewWeight, fetchUserWeights } from '../../actions/bodyweight_actions';
import { addNewProgressPic, fetchProgressPic } from '../../actions/progress_pic_actions';
import { fetchUserProfile, updateProfilePic } from '../../actions/user_actions';
// import { updateProfilePic } from '../../util/user_api_util'

const mapStateToProps = (state, ownProps) => {
  if (state.entities.users[ownProps.match.params.userId]) {
    return {
      currentUser: state.session.user,
      isAuthenticated: state.session.isAuthenticated,
      user: state.entities.users[ownProps.match.params.userId],
      userBodyweights: state.entities.users[ownProps.match.params.userId].bodyweights,
      userProgressPics: state.entities.users[ownProps.match.params.userId].progressPics
    }
  } else {
    return {
      currentUser: state.session.user,
      isAuthenticated: state.session.isAuthenticated,
      user: state.entities.users[ownProps.match.params.userId],
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addNewWeight: newWeight => dispatch(addNewWeight(newWeight)),
    fetchUserWeights: userId => dispatch(fetchUserWeights(userId)),
    fetchUserProfile: userId => dispatch(fetchUserProfile(userId)),
    addNewProgressPic: (formData, userId) => {return dispatch(addNewProgressPic(formData, userId)) },
    fetchProgressPic: userId => dispatch(fetchProgressPic(userId)),
    updateProfilePic: (formData, userId) => dispatch(updateProfilePic(formData, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);