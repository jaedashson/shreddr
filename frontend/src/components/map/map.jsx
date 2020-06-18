import { Map, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';
import keys from '../../confg/keys';

class eMap extends React.Component {
    render() {
        return (
            <Map
              google={this.props.google}
              zoom={8}
            //   style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
      }
}

export default GoogleApiWrapper({
    apiKey: keys.REACT_APP_GOOGLE_KEY,
  })(eMap);