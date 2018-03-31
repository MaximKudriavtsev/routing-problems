import * as React from 'react';
import Header from './header/header';
import Main from './main/main';
import Result from './result/result';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ margin: '0 auto' }}>
          <Header />
          <Main />
          <Result />
        </div>
      </ React.Fragment>
    );
  }
}
