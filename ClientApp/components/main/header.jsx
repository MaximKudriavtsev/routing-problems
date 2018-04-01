import * as React from 'react';
import { CardHeader } from 'reactstrap';

export default class Header extends React.PureComponent {
  render() {
    return (
      <CardHeader>
        <h5>Текущие заказы</h5>
      </CardHeader>
    );
  }
}