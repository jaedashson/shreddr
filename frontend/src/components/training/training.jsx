import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import '../../stylesheets/training.scss';

class Training extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      equipment: [],
      muscleGroup: [],
      difficulty: '',
    }
  }

  render() {
    let equipmentCheckbox = [];
    const equipment = []

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
              <div className="col-1">
                <span> Please select all available equipment:</span>
                <div className="equipment-list">
                  <label>
                    <input type="checkbox"/>Barbell
                  </label>
                  <label>
                    <input type="checkbox"/>Barbell Rack
                  </label>
                  <label>
                    <input type="checkbox"/>Bench
                  </label>
                  <label>
                    <input type="checkbox"/>Benchpress Machine
                  </label>
                  <label>
                    <input type="checkbox"/>Chair
                  </label>
                  <label>
                    <input type="checkbox"/>Dip Handle Bars
                  </label>
                  <label>
                    <input type="checkbox"/>Dumbbell
                  </label>
                  <label>
                    <input type="checkbox"/>Lat Pulldown Machine
                  </label>
                  <label>
                    <input type="checkbox"/>Olympic Squat Rack
                  </label>
                  <label>
                    <input type="checkbox"/>Pullup Bar
                  </label>
                  <label>
                    <input type="checkbox"/>Tricep Pushdown Machine
                  </label>
                  <label>
                    <input type="checkbox"/>Weight Belt
                  </label>
                </div>
              </div>
              <div className="col-2">

              </div>
              <div className="col-3">

              </div>
            </form>
          </div>
        </section>
      </section>
    ) 
  }
};

export default withRouter(Training);