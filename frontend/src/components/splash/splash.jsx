import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../stylesheets/splash.scss';
import Navbar from './navbar.jsx';

class Splash extends React.Component {
  constructor(props) {
    super(props);

  }
 
  render() {

    return (
      <section className="splash">

        <section className="splash-main">
          <div className="row-1"></div>
        </section>

      </section>
    ) 
  }
};

export default withRouter(Splash);