import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import '../../stylesheets/training.scss';
import { wrapGrid } from 'animate-css-grid'

const EQUIPMENT = [
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

const MUSCLEGROUPS = [
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

class Training extends React.Component {
  constructor(props) {
    super(props);

    let equipment = {}, muscleGroups = {};
    EQUIPMENT.forEach(e => (
      equipment[e] = false
    ));

    MUSCLEGROUPS.forEach(m => (
      muscleGroups[m] = false
    ))

    this.state = {
      difficulty: '',
      equipment: equipment,
      muscleGroups: muscleGroups,
      exercises: this.props.exercises,
    }
    
    this.difficultyChange = this.difficultyChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const grid = document.querySelector(".exercises-list");
    wrapGrid(grid);
    this.props.fetchExercises()
      .then(() => this.setState({ exercises: this.props.exercises }));
  }
  
  difficultyChange(e) {
    this.setState({ difficulty: e.target.value});
  }

  handleChange(item) { 
    return e => {
      if (e.target.classList.contains('equipment')) {
        if (!this.state.equipment[item]) {
          let temp = { ...this.state.equipment }
          temp[item] = true;
          this.setState({ equipment: temp })
        } else {
          let temp = { ...this.state.equipment }
          temp[item] = false;
          this.setState({ equipment: temp });
        }
      } else {
        if (!this.state.muscleGroups[item]) {
          let temp = { ...this.state.muscleGroups }
          temp[item] = true;
          this.setState({ muscleGroups: temp });
        } else {
          let temp = { ...this.state.muscleGroups }
          temp[item] = false;
          this.setState({ muscleGroups: temp });
        }
      }
    }
  }

  render() {
    let equipmentCheckbox, 
      muscleGroupsCheckbox, 
      filtered = [], 
      filteredDifficulty = [], 
      filteredEquipment = [], 
      filteredMuscleGroups = [], 
      equipValues = [], 
      muscleValues = [];

    equipmentCheckbox = EQUIPMENT.map((e, i) => (
      <label key={i}>
        <input type="checkbox"
          value={e}
          className="equipment"
          onChange={this.handleChange(e)}/>{e}
      </label>
    ));

    muscleGroupsCheckbox = MUSCLEGROUPS.map((m, i) => (
      <label key={i}>
        <input type="checkbox"
          value={m}
          className="muscle"
          onChange={this.handleChange(m)}/>{m}
      </label>
    ))
    
    if (this.state.exercises.length > 0) {
      if (this.state.difficulty !== '' ) {
        this.props.exercises.forEach(ele => {
          if (this.state.difficulty === 'beginner') {
            if (ele.difficulty === this.state.difficulty) {
              filteredDifficulty.push(ele);
            }
          } else if (this.state.difficulty === 'intermediate') {
            if (ele.difficulty === 'beginner' || ele.difficulty === 'intermediate') {
              filteredDifficulty.push(ele);
            }
          } else {
            filteredDifficulty.push(ele);
          }
        })
      } else {
        filteredDifficulty = this.state.exercises;
      }

      equipValues = Object.values(this.state.equipment);
      if (equipValues.every(val => val === false)) {
        filteredEquipment = filteredDifficulty;
      } else {
        filteredDifficulty.forEach(e => {
          if (e.equipment.every(equip => this.state.equipment[equip.charAt(0).toUpperCase() + equip.slice(1)] === true)) {
            filteredEquipment.push(e);
          }
        });
      }

      muscleValues = Object.values(this.state.muscleGroups);
      if (muscleValues.every(val => val === false)) {
        filteredMuscleGroups = filteredEquipment;
      } else {
        filteredEquipment.forEach(e => {
          if (e.muscleGroups.some(muscle => this.state.muscleGroups[muscle.charAt(0).toUpperCase() + muscle.slice(1)] === true)) {
            filteredMuscleGroups.push(e);
          }
        });
      }

      filtered = filteredMuscleGroups.map((e, i) => {
        let equipText = e.equipment.join(', ');
        if (e.equipment.length === 0) {
          equipText = "None";
        }
        return (
          <li key={e._id}
            className="filtered-exercise">
            <div>
              <span>Exercise: 
                <span>{e.name}</span>
              </span>
              <span>Difficulty: 
                <span className={e.difficulty}>{e.difficulty}</span>
              </span>
              <span>Equipment: 
                <span>{equipText}</span>
              </span>
              <span>Muscle Group(s): 
                <span>{e.muscleGroups.join(', ')}</span>
              </span>
            </div>
          </li>
        )
      })
    }

    return (
      <section className="training">
        <div className="training-nav">
          <div>
            <span>Plan Your Workout</span>
          </div>
        </div>

        <section className="main">
          <div className="image"></div>
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
                  <div className="difficulty-radio">
                    <div>
                      <input type="radio" 
                        name={this.state.difficulty} 
                        value="beginner" 
                        onChange={this.difficultyChange}
                        checked={this.state.difficulty === "beginner"}/>
                      <label>Beginner</label>
                    </div>
                    <div>
                      <input type="radio" 
                      name={this.state.difficulty} 
                      value="intermediate" 
                      onChange={this.difficultyChange}
                      checked={this.state.difficulty === "intermediate"}/>
                      <label>Intermediate</label>
                    </div>
                    <div>
                      <input type="radio" 
                        name={this.state.difficulty} 
                        value="advanced" 
                        onChange={this.difficultyChange}
                        checked={this.state.difficulty === "advanced"}/>
                      <label>Advanced</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="exercises">
            <div className="exercises-container">
              <span className="title">Get Pumped With These Exercises</span>
              <ul className="exercises-list">
                {filtered}
              </ul>
            </div>
          </div>
        </section>
      </section>
    ) 
  }
};

export default withRouter(Training);