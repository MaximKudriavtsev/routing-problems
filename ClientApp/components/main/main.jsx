import * as React from 'react';
import { Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import * as actionCreators from "./actions";
import Title from './header';
import Grid from './grid';
import ControlPanel from './control-panel';
import ModalWindow from './modal-window';

class Main extends React.PureComponent {
  render() {
    const {  rows } = this.props.main;

    return (
      <React.Fragment>
        <Card>
          <Title />
          <CardBody>
            <Grid rows={rows} />
          </CardBody>
          <ControlPanel />
          <ModalWindow />
        </Card>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
      main: state.main
  }),
  (actionCreators)
)(Main);