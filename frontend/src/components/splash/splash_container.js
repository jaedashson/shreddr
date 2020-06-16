import { openModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import Splash from './splash.jsx';

const mapDispatchToProps = dispatch => ({
  openModal: type => dispatch(openModal(type))
});

export default connect(null, mapDispatchToProps)(Splash);
