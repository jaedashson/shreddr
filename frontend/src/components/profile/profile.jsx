import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../stylesheets/profile.scss';

class Profile extends React.Component {
  render() {
    const { logout } = this.props;

    return(
      <section className="profile">
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
            <button>
              <span className="btn-text"
                onClick={() => logout()}
                >Logout</span>
            </button>
          </div>
        </div>
        <div className="profile-nav">
          <div>
            <span>Member Profile</span>
          </div>
        </div>

        <section className="main">
          <div className="row-1-container">
            <div className="row-1">
              <div className="left">
                <div className="left-left">
                  <div className="pfp">

                  </div>

                  <div>
                    <span className="name">Tiffany</span>
                    {/* change to currentUser's fname */}
                  </div>
                </div>

                <div className="left-right">
                  <div>
                    <span>Height: </span>
                    <span>Current Weight: </span>
                    <span>Goal Weight: </span>
                    <span>Pounds Lost: </span>
                  </div>
                </div>
              </div>

              <div className="right">
                <span>Progress Photos</span>
              </div>

              <div className="line"></div>
            </div>

          </div>

          <div className="progress-tracker">

          </div>
        </section>
      </section>
    )
  }
}

export default withRouter(Profile);