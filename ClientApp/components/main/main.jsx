import * as React from 'react';
import { Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import * as actionCreators from "./actions";
import Title from './header';
import Grid from './grid';
import ControlPanel from './control-panel';
import ModalWindow from './modal-window';
import { DivWrapper } from "./main.style";

class Main extends React.PureComponent {
  render() {
    const { loading, rows } = this.props.main;

    return (
      <React.Fragment>
        {
          loading && <DivWrapper>
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </DivWrapper>
        }
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
      main: state.main,

  }),
  (actionCreators)
)(Main);