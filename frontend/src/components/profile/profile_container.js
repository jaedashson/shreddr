import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
// import { closeModal, openModal } from '../../actions/modal_actions'
import Profile from './profile.jsx';

const mapStateToProps = (state, ownProps) => ({
  // user: state.entities.users[ownProps.match.params.userId]
  isAuthenticated: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);