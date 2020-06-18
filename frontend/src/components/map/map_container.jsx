import React from 'react';
// import eMap from './map';
import keys from '../../confg/keys';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

class eMapContainer extends React.Component {
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
})(eMapContainer);