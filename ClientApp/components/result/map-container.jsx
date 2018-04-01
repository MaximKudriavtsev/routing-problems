import * as React from 'react';
const _ = require("lodash");
import { GoogleMap, withGoogleMap, withScriptjs, Marker } from "react-google-maps";  

const MapWithAMarker = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={props.center}
    >
      {props.markers(props.locations)}
    </GoogleMap>
  );
}
));

export default class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      center: { lat: -34.397, lng: 150.644 }
    };
  }
  render() {
    // const { directions } = this.state;

    const locations = [
      { lat: -33.890542, lng: 151.274856 },
      { lat: -33.923036, lng: 151.259052 },
      { lat: -34.028249, lng: 151.157507 },
      { lat: -33.950198, lng: 151.259302 },
    ];
    const nextCenter = _.get(locations, '0.position', this.state.center);
    const points = locations => locations.map(location => (
      <Marker key={location.lat} position={{ lat: location.lat, lng: location.lng }} />
    ));

    return(
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers={points}
        locations={locations}
        center={nextCenter}
      />
    );
  }
}