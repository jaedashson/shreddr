import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/login.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: this.props.errors
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProp) {
    if(prevProp.errors !== this.props.errors) {
      this.setState({errors: this.props.errors});
    }
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

    this.props.login(user).then( err => {
      debugger;
      if (err.errors) {
        this.props.openModal("login");
      } else {
        this.props.closeModal();
      }
    });
  }

  render() {
    const { openModal } = this.props;

    return (
      <div className="login-form-container">
        <span className="login-text">Welcome Back!</span>
        <form className="login-form"onSubmit={this.handleSubmit}>

            <input type="text"
              className={Object.keys(this.state.errors).includes('login_email') ? "error-border" : ""}
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            <div className={Object.keys(this.state.errors).includes('login_email') ? "signup-errors" : "signup-errors hidden"}>Invalid email.</div>

            <input type="password"
              className={Object.keys(this.state.errors).includes('login_password') ? "error-border" : ""}
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <div className={Object.keys(this.state.errors).includes('login_password') ? "signup-errors" : "signup-errors hidden"}>Invalid password.</div>

            <button className="login" onClick={this.handleSubmit}>Login</button>

        </form>

        <div className="login-here">
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