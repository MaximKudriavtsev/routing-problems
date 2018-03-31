import React from "react";
import // State or Local Processing Plugins
"@devexpress/dx-react-grid";
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
      ],
      rows: [
        { id: "0", from: "Paris", to: "Las Vegas", weight: "300" },
        { id: "1", from: "Austin", to: "Paris", weight: "100" },
        { id: "2", from: "Las Vegas", to: "Paris", weight: "150" },
        { id: "3", from: "Austin", to: "Paris", weight: "230" },
        { id: "4", from: "Las Vegas", to: "Austin", weight: "450" }
      ]
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DXGrid rows={rows} columns={columns}>
        <Table />
        <TableHeaderRow />
      </DXGrid>
    );
  }
}