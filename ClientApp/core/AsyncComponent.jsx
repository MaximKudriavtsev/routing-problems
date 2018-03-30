import * as React from 'react';

export function AsyncComponent(ComponentLoader){
    class AsyncComponent extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                Component: null
            };
        }

        async componentDidMount(){
            var Component = await ComponentLoader();
            this.setState({
                Component: Component.default
            });
        }

        render(){
            var Component = this.state.Component;

            return <div>
                {
                    (Component && <Component routeProps />) || <p>Loading...</p>
                }
            </div>
        }
    }

    return AsyncComponent;
}
