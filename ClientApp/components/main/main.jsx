import * as React from 'react';
import { Card, CardBody } from 'reactstrap';
import Title from './header';
import Grid from './grid';
import ControlPanel from './control-panel';

export default class Main extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Card>
            <Title />
            <CardBody>
              <Grid />
            </CardBody>
            <ControlPanel />
        </Card>
      </React.Fragment>
    );
  }
}