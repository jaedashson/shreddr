import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
// import { closeModal, openModal } from '../../actions/modal_actions'
import Profile from './profile.jsx';
import { addNewWeight } from '../../actions/weight_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.user,
  isAuthenticated: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  addNewWeight: newWeight => dispatch(addNewWeight(newWeight)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);