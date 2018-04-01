import * as React from 'react';

export default class Header extends React.PureComponent {
  render() {
    return (
      <header className="navbar navbar-expand navbar-dark">
        <i src="./logo.png" />
        <h2>Calculating Optimal Path</h2>
      </header>
    );
  }
}