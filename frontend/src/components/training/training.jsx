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
    let equipmentCheckbox, muscleGroupsCheckbox;
    const equipment = [
      "Barbell", 
      "Barbell Rack", 
      "Bench", 
      "Benchpress Machine", 
      "Chair", 
      "Dip Handle Bars", 
      "Dumbbell", 
      "Lat Pulldown Machine", 
      "Olympic Squat Rack", 
      "Pullup Bar", 
      "Tricep Pushdown Machine", 
      "Weight Belt"
    ];

    equipmentCheckbox = equipment.map(e => (
      <label>
        <input type="checkbox"
          value={e.toLowerCase()}/>{e}
      </label>
    ));

    const muscleGroups = [
      "Abdominals",
      "Anterior Deltoid", 
      "Bicep",
      "Calves",
      "Chest", 
      "Gluteus Maximus",
      "Hamstring",
      "Latissimus Dorsi",
      "Pectoral",
      "Quadriceps",
      "Trapizius",
      "Tricep", 
    ];

    muscleGroupsCheckbox = muscleGroups.map(m => (
      <label>
        <input type="checkbox"
          value={m.toLowerCase()}/>{m}
      </label>
    ))

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
              <div className="options">
                <div className="col-1">
                  <span> Please select all available equipment:</span>
                  <div className="equipment-list">
                    {equipmentCheckbox}
                  </div>
                </div>
                <div className="col-2">
                  <span>Please select targeted muscle groups:</span>
                  <div className="muscles-list">
                    {muscleGroupsCheckbox}
                  </div>
                </div>
                <div className="col-3">
                  <span>Choose your difficulty:</span>
                  <select name="">
                    <option value="">Beginner</option>
                    <option value="">Intermediate</option>
                    <option value="">Advanced</option>
                  </select>
                </div>
              </div>

              <button>Let's Train</button>
            </form>
          </div>
        </section>
      </section>
    ) 
  }
};

export default withRouter(Training);