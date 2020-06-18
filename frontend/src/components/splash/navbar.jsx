import React from 'react';
import {
  withRouter,
  Link
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <button className="logout-btn">
            <span className="btn-text" onClick={() => logout()}>Logout</span>
          </button>
        </>
      )

    } else {
      btn = (
        <button className="login-btn">
          <FontAwesomeIcon icon={['far', 'user']} className="fa-user" />
          <span className="btn-text" onClick={() => openModal('signup')}>Join Now</span>
        </button>
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
            <span>Gym Finder</span>
            <div className="border"></div>
            <span>Forum</span>
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