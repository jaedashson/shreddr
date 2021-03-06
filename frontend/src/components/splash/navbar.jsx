import React from 'react';
import {
  withRouter,
  Link
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

class Navbar extends React.Component {
  render() {
    const { openModal, isAuthenticated, logout, currentUser } = this.props;

    let btn;
    if (isAuthenticated) {
      const firstName = this.props.currentUser.fName.charAt(0).toUpperCase() + this.props.currentUser.fName.slice(1);
      btn = (
        <>
          <Link to={`/users/${currentUser.id}`} style={{ textDecoration: 'none' }}>
            <div className="profile-wrapper">
              <FontAwesomeIcon className="nav-bar-profile-icon" icon="user-circle" />
              <div className="nav-name">{firstName}</div>
            </div>
          </Link>
          <Button className="logout-btn">
            <span className="btn-text" onClick={() => logout()}>Logout</span>
          </Button>
        </>
      )

    } else {
      btn = (
        <Button variant="contained"
          className="login-btn">
          <FontAwesomeIcon icon={['far', 'user']} className="fa-user" />
          <span className="btn-text" onClick={() => openModal('signup')}>Join Now</span>
        </Button>
      )
    }

    return (
      <section className="splash">
        <div className="splash-nav">
          <Link to='/'
            style={{ textDecoration: 'none' }}>
            <span className="link">Shreddr</span>
          </Link>

          <div className="center">
            <Link to='/training'
              style={{ textDecoration: 'none', color: 'black' }}>
            <span>Training</span>
            </Link>

            <div className="border"></div>
            <Link to="/gym-finder"
              style={{ textDecoration: 'none', color: 'black' }}>
            <span>Gym Finder</span>
            </Link>
            <div className="border"></div>
            <a href="https://github.com/jaedashson/shreddr"
              style={{ textDecoration: 'none', color: 'black' }}>
            <span>Forum</span>
            </a>
          </div>

          <div className="btns">
            {btn}
          </div>

        </div>
      </section>
    )
  }
};

export default withRouter(Navbar);