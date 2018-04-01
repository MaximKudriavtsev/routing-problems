import * as React from 'react';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

/* eslint-disable no-undef */

export const MapDirection = compose(
  withProps({
    googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { pointPairs } = nextProps;
      const DirectionsService = new google.maps.DirectionsService();

      const onlyFrom = pointPairs.map(item => ({ lat: item.from.split(',')[0] * 1, lng: item.from.split(',')[1] * 1 }));
      const wayPoints = pointPairs.map(pair => {return {location: pair.to, stopover: true }});
      DirectionsService.route({
        origin: new google.maps.LatLng(onlyFrom[0].lat, onlyFrom[0].lng),
        destination: new google.maps.LatLng(onlyFrom[0].lat, onlyFrom[0].lng),
        waypoints: wayPoints,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          debugger;
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
      
    }
  })
)(props => {
  const { directions } = props;
  debugger
  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
    >
      <DirectionsRenderer directions={directions} />
    </GoogleMap>
    );
  }
);
