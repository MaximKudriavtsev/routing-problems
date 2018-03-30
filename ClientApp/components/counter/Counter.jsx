import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from "./actions";

export class Counter extends React.Component {
    render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{this.props.counter.count}</strong></p>

            <button onClick={() => { this.props.increment() }}>Increment</button>
            <button onClick={() => { this.props.decrement() }}>Decrement</button>
        </div>;
    }
}

export default connect(
    state => ({
        counter: state.counter
    }),
    (actionCreators)
)(Counter);