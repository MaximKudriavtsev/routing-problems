import * as React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs, Marker } from "react-google-maps";  

// const MapWithAMarker = withGoogleMap(() =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {/* <Marker
//       position={{ lat: -34.397, lng: 150.644 }}
//     /> */}
//   </GoogleMap>
// );

const MapWithAMarker = withScriptjs(withGoogleMap(() =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
));

export default class MapContainer extends React.PureComponent {
  render() {
    return(
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}