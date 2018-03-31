import React from "react";
import {
  EditingState
} from "@devexpress/dx-react-grid";
import {
  Grid as DXGrid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4";

export default class Grid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "id", title: "ID" },
        { name: "from", title: "Начальный адрес" },
        { name: "to", title: "Конечный адрес" },
        { name: "weight", title: "Масса груза" },
      ]
    };
  }
  render() {
    const { commitChanges, rows } = this.props;
    const { columns } = this.state;

    return (
      <DXGrid rows={rows} columns={columns}>
        <EditingState
          onCommitChanges={commitChanges}
        />
        <Table />
        <TableHeaderRow />
      </DXGrid>
    );
  }
}