import * as React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import * as actionCreators from "../main/actions";
import { MapDirection } from './map-direction';


class Result extends React.PureComponent {
  render() {
    const { resultPoints } = this.props.main;
    return (
          <Card style={{ marginTop: '20px' }}>
          <CardHeader>
            <h5>Маршрут</h5>
          </CardHeader>
          <CardBody>
            <MapDirection pointPairs={resultPoints} />
          </CardBody>
        </Card>
    );
  }
}

export default connect(
  state => ({
      main: state.main
  }),
  (actionCreators)
)(Result);