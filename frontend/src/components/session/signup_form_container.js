import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions'
import SignupForm from './signup_form.jsx';

const mapStateToProps = state => ({
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    openModal: type => dispatch(openModal(type))
})

export default connect( mapStateToProps, mapDispatchToProps)(SignupForm);