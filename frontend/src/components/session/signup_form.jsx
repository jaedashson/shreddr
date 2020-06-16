import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/signup.scss';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    let date = new Date();
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();

    this.state = {
      email: '',
      fName: '',
      lName: '',
      password: '',
      password2: '',
      dob: `${this.year}-${this.month}-${this.day}`,
      gender: '',
      errors: this.props.errors,
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

  updateDob(field) {
    return e => {
      if (field === 'month') {
        this.month = e.target.value;
      } else if (field === 'year') {
        this.year = e.target.value;
      } else {
        this.day = e.target.value;
      }
      return this.setState({ dob: `${this.year}-${this.month}-${this.day}` });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      fName: this.state.fName,
      lName: this.state.lName,
      dob: this.state.dob,
      gender: this.state.gender,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user).then(() => this.props.closeModal()).catch( () => this.props.openModal('signup'));

    // this.props.closeModal();
  }

  render() {
    const { openModal } = this.props;

    const years = ['Year']
    for(let i = 2020; i >= 1905; i--) {
      years.push(i);
    }

    const days = ['Day']
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }

    const months = ["Month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const birthdayYears = years.map( year => {
      return <option key={year} value={year}>{year}</option>
    })

    const birthdayDays = days.map( day => {
      return <option key={day} value={day}>{day}</option>;
    })

    const birthdayMonths = months.map( (month, idx) => {
      return <option key={month} value={idx}>{month}</option>;
    })

    return (
      <div className="signup-form-container">
        <span className="signup">Create an Account</span>
        <form onSubmit={this.handleSubmit}>

          <div className="signup-form">
            <div className="signup-r1">
              <input type="text"
                className={Object.keys(this.state.errors).includes('fName') ? "signup-names error-border" : "signup-names" }
                value={this.state.fName}
                onChange={this.update('fName')}
                placeholder="First name"
              />
              <input type="text"
                className={Object.keys(this.state.errors).includes('lName') ? "signup-names error-border" : "signup-names" }
                value={this.state.lName}
                onChange={this.update('lName')}
                placeholder="Last name"
              />
            </div>
            <div className={Object.keys(this.state.errors).includes('fName') || Object.keys(this.state.errors).includes('lName') ? "signup-errors" : "signup-errors hidden"}>What's your name?</div>

            <input type="text"
              className={Object.keys(this.state.errors).includes('email') ? "error-border" : ""}
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            <div className={Object.keys(this.state.errors).includes('email') ? "signup-errors" : "signup-errors hidden"}>Please enter a valid email.</div>

            <input type="password"
              className={Object.keys(this.state.errors).includes('password') ? "error-border" : ""}
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <div className={Object.keys(this.state.errors).includes('password') ? "signup-errors" : "signup-errors hidden"}>Password must be at least 6 characters.</div>

            <input type="password"
              className={Object.keys(this.state.errors).includes('password2') ? "error-border" : ""}
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm Password"
            />
            <div className={Object.keys(this.state.errors).includes('password2') ? "signup-errors" : "signup-errors hidden"}>Password must match.</div>

            <div className="gender">
              <span>Sex:</span>
              <div className="gender-wrapper">
                <input type="radio"
                  value="Female"
                  name={this.state.gender}
                  onClick={this.update('gender')} /> 
                <label> Female </label>

                <input type="radio"
                  value="Male"
                  name={this.state.gender}
                  onClick={this.update('gender')} /> 
                <label> Male </label>
              </div>
            </div>
            <div className={Object.keys(this.state.errors).includes('gender') ? "signup-errors" : "signup-errors hidden"}>Please select a sex.</div>

            <div className="dob">
              <span className="dob-text">Date of Birth:</span>
              <div className="dob-r2">
                <select
                  name={this.state.month}
                  className="signup-month"
                  onChange={this.updateDob("month")}
                  value={this.state.dob.split('-')[1]}
                >
                  {birthdayMonths}
                </select>

                <select
                  name={this.state.day}
                  className="signup-day"
                  onChange={this.updateDob("day")}
                  value={this.state.dob.split('-')[2]}
                >
                  {birthdayDays}
                </select>

                <select
                  name={this.state.day}
                  className="signup-year"
                  onChange={this.updateDob("year")}
                  value={this.state.dob.split('-')[0]}
                >
                  {birthdayYears}
                </select>
              </div>  
            </div>
          </div>
          <button className="signup"
            onClick={this.handleSubmit}>Sign Up</button>
        </form>

        <div className="login-here">
          <span>Already have an account? Sign in </span>
          <span className="btn"
            onClick={() => openModal('login')}>here</span>
          <span>.</span>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);