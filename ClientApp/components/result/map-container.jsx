import * as React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs, Marker } from "react-google-maps";  

const MapWithAMarker = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={props.center}
    >
      {props.markers(props.locations)}
    </GoogleMap>
  );
}
));

export default class MapContainer extends React.PureComponent {
  render() {
    const { points4 } = this.props;
    const points5 = points4.slice();
    const nextCenter2 = points5.reduce((acc, pair) => {
      acc.lat += pair.lat;
      acc.lng += pair.lng;
      return acc;
    }, { lat: 0, lng: 0 });
    nextCenter2.lng /= points5.length;
    nextCenter2.lat /= points5.length;

    const points = locations => locations.map((location, index) => (
      <Marker key={index} position={{ lat: location.lat, lng: location.lng }} />
    ));

    return(
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers={points}
        locations={points4}
        center={nextCenter2}
      />
    );
  }
}