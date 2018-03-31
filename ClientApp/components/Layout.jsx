import * as React from 'react';

export class Layout extends React.Component {
    render() {
        return <div className='container'>
                <div className='col-sm'>
                    { this.props.children }
                </div>
        </div>;
    }
}
