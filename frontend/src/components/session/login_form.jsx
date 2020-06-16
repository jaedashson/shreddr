import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/login.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/tweets');
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { openModal } = this.props;

    return (
      <div className="login-form-container">
        <span className="login">Welcome Back!</span>
        <form onSubmit={this.handleSubmit}>
          <div className="login-form">
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <button>Login</button>
            {this.renderErrors()}
          </div>
        </form>
        <div className="signup-here">
          <span>Don't have an account? Sign up </span>
          <span className="btn"
            onClick={() => openModal('signup')}>here</span>
          <span>.</span>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);