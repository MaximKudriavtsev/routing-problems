import * as React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import MapContainer from './map-container';

export default class Result extends React.PureComponent {
  render() {
    return (
      <Card style={{ marginTop: '20px' }}>
        <CardHeader>
          Маршрут
        </CardHeader>
        <CardBody>
          <MapContainer />
        </CardBody>
      </Card>
    );
  }
}