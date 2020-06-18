import React from 'react';
import keys from '../../confg/keys';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import '../../stylesheets/map.scss';

class eMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gym_location: [
      {lat: 40.732526, long: -73.866441, name: "Retro Fitness" },
      {lat: 40.737359, long: -73.892914, name: "Bootcamp Queens"},
      {lat: 40.740805, long: -73.903729, name: "Big Six Fitness"},
      {lat: 40.748218, long: -73.879610, name: "Planet Fitness"},
      {lat: 40.749974, long: -73.865448, name: "Xtreme Fitness NYC Inc"},
      {lat: 40.744122, long: -73.914629, name: "Phyzique"},
      {lat: 40.752055, long: -73.933856, name: "Powerhouse Gym Long Island City"},
      {lat: 40.758296, long: -73.919436, name: "Blink Fitness"},
      {lat: 40.783201, long: -73.952981, name: "92Y May Center For Health, Fitness and Sport"},
      {lat: 40.782031, long: -73.950578, name: "Equinox East 92nd Street"},
      {lat: 40.767016, long: -73.956930, name: "Refine Method Upper East Side"},
      {lat: 40.774492, long: -73.981477, name: "Equinox Sports Club New York"},
      {lat: 40.767276, long: -73.987571, name: "Planet Fitness"},
      {lat: 40.791714, long: -73.971607, name: "X 93 Fitness"},
      {lat: 40.809711, long: -73.952896, name: "My Gym Harlem"},
      {lat: 40.810101, long: -73.961994, name: "Dodge Physical Fitness Center"},
      {lat: 40.719714, long: -73.955390, name: "Chalk Gyms"},
      {lat: 40.672339, long: -73.856170, name: "LA Fitness"},
      {lat: 40.718673, long: -73.939597, name: "24/7 Barbell Gym"},
      {lat: 40.715550, long: -73.872649, name: "Vigorous Fitness Clubs"},
      {lat: 40.854692, long: -73.843551, name: "Dolphin Fitness Club"},
      {lat: 40.862872, long: -73.894706, name: "Planet Fitness"},
      {lat: 40.872478, long: -73.874622, name: "Crunch Fitness-Norwood"},
      {lat: 40.831187, long: -73.904834, name: "Retro Fitness"},
      {lat: 40.817938, long: -73.915649, name: "Planet Fitness"}
      ],
      isOpen: true,
      activeMarker: {},
      selectedPlace: {},
    };
    this.toggleMapClose = this.toggleMapClose.bind(this);
    this.toggleMapOpen = this.toggleMapOpen.bind(this);
  } 

  toggleMapOpen = (props, marker) => {
    // debugger
    this.setState({ isOpen: true, activeMarker: marker, selectedPlace: props});
  }

  toggleMapClose = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false, activeMarker: null });
    }
  }

  displayMarkers = () => {
    return this.state.gym_location.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          name={store.name}
          position={{ lat: store.lat, lng: store.long }}
          onClick={this.toggleMapOpen}
        />
      );
    })
  }

  render() {
    return (
      <Map
        style={{ width: 500, height: 500, position: "relative" }}
        google={this.props.google}
        zoom={12}
        initialCenter={{ lat: 40.752055, lng: -73.933856 }}
        onClick={this.toggleMapClose}
      >
        {this.displayMarkers()}
        <InfoWindow
          visible={this.state.isOpen}
          marker={this.state.activeMarker}
        >
          <div className="infowindow-text">
            <span className="infowindow-name">{this.state.selectedPlace.name}</span>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: keys.REACT_APP_GOOGLE_KEY,
})(eMapContainer);