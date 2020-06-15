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
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.signedIn === true) {
  //     this.props.history.push('/login');
  //   }

  //   this.setState({ errors: nextProps.errors })
  // }

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
      fname: this.state.fname,
      lname: this.state.lname,
      dob: this.state.dob,
      gender: this.state.gender,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
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
    // fname, lname, dob, gender, pw twice?, email 

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
        <form onSubmit={this.handleSubmit}>
          <span>Sign </span>
          <div className="signup-form">
            <input type="text"
              value={this.state.fname}
              onChange={this.update('fname')}
              placeholder="First name"
            />
            <input type="text"
              value={this.state.lname}
              onChange={this.updateDob('lname')}
              placeholder="Last name"
            />

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
              onChange={this.update("year")}
              value={this.state.dob.split('-')[0]}
            >
              {birthdayYears}
            </select>

            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            <input type="text"
              value={this.state.handle}
              onChange={this.update('handle')}
              placeholder="Handle"
            />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm Password"
            />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);