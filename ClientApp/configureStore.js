import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducers } from './components/store';

export default function configureStore(history, initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    var devToolsExtension = process.env.NODE_ENV === "development" && windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__;
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk, routerMiddleware(history)), 
        // eslint-disable-next-line
        devToolsExtension ? devToolsExtension() : next =>  next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, initialState);

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./components/store', () => {
            const nextRootReducer = require('./components/store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
}

function buildRootReducer(allReducers) {
    return combineReducers(Object.assign({}, allReducers, { routing: routerReducer }));
}
