import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import '../../stylesheets/training.scss';

class Training extends React.Component {
  render() {
    return (
      <section className="training">
        <div className="training-nav">
          <div>
            <span>Plan Your Workout</span>
          </div>
        </div>

        <section className="main">
          <div className="form-container">
            <form className="training-form">

            </form>
          </div>
        </section>
      </section>
    ) 
  }
};

export default withRouter(Training);