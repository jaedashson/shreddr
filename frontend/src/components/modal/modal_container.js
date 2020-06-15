import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

import Modal from './modal.jsx';

const mapStateToProps = (state, ownProps) => ({
  modal: state.ui.modal,
});

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
