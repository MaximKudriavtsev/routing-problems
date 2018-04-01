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
    } else if (resultPoints.length === 0) { // !!!!!!!!!!!!!!!S
      template = () => (<div>Маршрут не построен</div>);
    } else {
      const points = [];
      resultPoints.forEach((pair, index) => {
          const lat = pair.from.split(',')[0] * 1;
          const lng = pair.from.split(',')[1] * 1;
          points.push({ lat, lng });
        if (index === resultPoints.length - 1) {
          points.push(points[0]);
        }
      });
      template = () => (
        <Card style={{ marginTop: '20px' }}>
          <CardHeader>
            Маршрут
          </CardHeader>
          <CardBody>
            <MapContainer points4={points}/>
          </CardBody>
        </Card>
      );
    }
    return template();
  }
}

export default connect(
  state => ({
      main: state.main
  }),
  (actionCreators)
)(Result);