import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions'
import LoginForm from './login_form.jsx';

const mapStateToProps = state => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);