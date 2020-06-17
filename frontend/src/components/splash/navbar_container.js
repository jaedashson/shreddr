import { openModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import Navbar from './navbar.jsx';

const mSTP = state => ({
  isAuthenticated: state.session.isAuthenticated
});

const mDTP = dispatch => ({
  openModal: type => dispatch(openModal(type)),
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Navbar);
