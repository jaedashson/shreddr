import React from 'react';
import {
  withRouter,
  // Link
} from 'react-router-dom';
import '../../stylesheets/gym_finder.scss';

class GymFinder extends React.Component {
  render() {
    return (
      <section className="gym-finder">
        <div className="nav">
          <div>
          <span>Locations</span>
          </div>
        </div>
        <h3>Hello</h3>
      </section>
    )
  }
};

export default withRouter(GymFinder);