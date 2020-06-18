import React from 'react';
import { withRouter } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../stylesheets/splash.scss';
// import Map from '../map/map_container';

class Splash extends React.Component {
 
  render() {
    
    return (
      <section className="splash">

        <section className="splash-main">
          <div className="row-1"></div>
        </section>
        {/* <Map /> */}
      </section>
    ) 
  }
};

export default withRouter(Splash);