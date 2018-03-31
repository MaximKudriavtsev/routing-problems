import * as React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import * as actionCreators from "../main/actions";
import MapContainer from './map-container';

class Result extends React.PureComponent {
  render() {
    const { loading, resultPoints } = this.props.main;
    let template;
    if (loading) {
      template = () => (<div>Загрузка машины...</div>);
    } else if (resultPoints.length === 0) {
      template = () => (<div>Нечего показывать...</div>);
    } else {
      template = () => (
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
    debugger;
    return template();
  }
}

export default connect(
  state => ({
      main: state.main
  }),
  (actionCreators)
)(Result);