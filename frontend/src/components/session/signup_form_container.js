import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions'
import SignupForm from './signup_form.jsx';

const mapStateToProps = state => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    login: user => { return dispatch(login(user)) },
    signup: user => { return dispatch(signup(user)) },
    closeModal: () => dispatch(closeModal()),
    openModal: type => dispatch(openModal(type))
})

export default connect( mapStateToProps, mapDispatchToProps)(SignupForm);