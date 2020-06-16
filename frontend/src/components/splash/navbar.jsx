import React from 'react';
import {
  withRouter,
  Link
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { openModal, isAuthenticated, logout } = this.props;

    let btn;
    if (isAuthenticated) {
      btn = (
        <button>
          <span className="btn-text"
            onClick={() => logout()}
          >Logout</span>
        </button>
      )

    } else {
      btn = (
        <button>
          <FontAwesomeIcon icon={['far', 'user']}
            className="fa-user" />
          <span className="btn-text"
            onClick={() => openModal('signup')}>Join Now</span>
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
            <span>Training</span>
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