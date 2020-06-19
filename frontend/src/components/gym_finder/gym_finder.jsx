import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/gym_finder.scss';
import Map from '../map/map_container';

class GymFinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      google: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  handleSubmit() {

  }

  render() {
    return (
      <section className="gym-finder">
        <div className="nav">
          <div>
          <span>Locations</span>
          </div>
        </div>
        <section className="main">
          <div className="container">
            <div className="inner-main">
              <span className="gym-finder-msg">Find your nearest gym or park to start training</span>
              <form onSubmit={this.handleSubmit}>
                <input type="text" 
                  placeholder="Please type your address or zipcode and press enter"
                  className="google"
                  onChange={this.update('google')}/>
              </form>
              <div className="map-wrapper">
                <Map />
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
};

export default withRouter(GymFinder);