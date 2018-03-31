import * as React from 'react';
import { connect } from 'react-redux';
import { Button, CardFooter } from 'reactstrap';
import * as actionCreators from "./actions";

class ControlPanel extends React.PureComponent {
  render() {
    const { toggleModal } = this.props;
    const onAddButtonClick = () => {
      toggleModal();
    };

    return (
      <React.Fragment>
        <CardFooter>
            <Button 
              color="primary"
              onClick={onAddButtonClick}
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

export default connect(
  state => ({
      main: state.main
  }),
  (actionCreators)
)(ControlPanel);