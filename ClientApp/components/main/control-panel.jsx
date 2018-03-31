import * as React from 'react';
import { Button, CardFooter } from 'reactstrap';

export default class ControlPanel extends React.PureComponent {
  render() {
    const { toggleModal } = this.props;

    return (
      <React.Fragment>
        <CardFooter>
            <Button 
              color="primary"
              onClick={toggleModal}
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