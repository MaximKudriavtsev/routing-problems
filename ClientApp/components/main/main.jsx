import * as React from 'react';
import { Card, CardBody } from 'reactstrap';
import Title from './header';
import Grid from './grid';
import ControlPanel from './control-panel';
import ModalWindow from './modal-window';

export default class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      rows: [
        { id: "0", from: "Paris", to: "Las Vegas", weight: "300" },
        { id: "1", from: "Austin", to: "Paris", weight: "100" },
        { id: "2", from: "Las Vegas", to: "Paris", weight: "150" },
        { id: "3", from: "Austin", to: "Paris", weight: "230" },
        { id: "4", from: "Las Vegas", to: "Austin", weight: "450" }
      ]
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
  }
  commitChanges({ added }) {
    let { rows } = this.state;
    if (added) {
      const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    this.setState({ rows });
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  render() {
    const { showModal, rows } = this.state;

    return (
      <React.Fragment>
        <Card>
            <Title />
            <CardBody>
              <Grid rows={rows} commitChanges={this.commitChanges} />
            </CardBody>
            <ControlPanel toggleModal={this.toggleModal} />
            <ModalWindow open={showModal} toggleModal={this.toggleModal} />
        </Card>
      </React.Fragment>
    );
  }
}