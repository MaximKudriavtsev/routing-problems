import * as React from 'react';
import Header from './header';
import Main from './main';
import Result from './result';

export default class App extends React.Component {
  render() {
    return <React.Fragment>
      <Header />
      <Main />
      <Result />
    </ React.Fragment>
  }
}
