import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../stylesheets/splash.scss';

class Splash extends React.Component {
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
          <span>Shreddr</span>

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

        <section className="splash-main">
          <div className="row-1"></div>
        </section>

      </section>
    ) 
  }
};

export default withRouter(Splash);