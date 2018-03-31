import * as React from 'react';
import { Button, CardFooter } from 'reactstrap';

export default class ControlPanel extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <CardFooter>
            <Button 
              color="primary"
            >
              Добавить заказчика
            </Button>
            <Button
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Вычислить маршрут
            </Button>
        </CardFooter>
      </React.Fragment>
    );
  }
}