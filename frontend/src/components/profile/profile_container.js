import { connect } from 'react-redux';
// import { closeModal, openModal } from '../../actions/modal_actions'
import Profile from './profile.jsx';
import { addNewWeight } from '../../actions/weight_actions';
import { fetchUserProfile } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId],
  currentUser: state.session.user,
  isAuthenticated: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  addNewWeight: newWeight => dispatch(addNewWeight(newWeight)),
  fetchUserProfile: userId => dispatch(fetchUserProfile(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);