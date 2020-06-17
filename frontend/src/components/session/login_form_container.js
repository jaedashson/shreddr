import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions'
import LoginForm from './login_form.jsx';

const mapStateToProps = state => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    login: user => { return dispatch(login(user)) },
    closeModal: () => dispatch(closeModal()),
    openModal: modal => dispatch(openModal(modal))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);