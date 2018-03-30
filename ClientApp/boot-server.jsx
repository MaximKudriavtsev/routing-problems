import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { replace } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import { createServerRenderer } from 'aspnet-prerendering';
import { routes } from './routes';
import configureStore from './configureStore';
import * as FetcherActions from "./components/fetcher/actions";

export default createServerRenderer(params => {
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
        // Prepare Redux store with in-memory history, and dispatch a navigation event
        // corresponding to the incoming URL
        const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        const urlAfterBasename = params.url.substring(basename.length);
        const store = configureStore(createMemoryHistory());
        store.dispatch(replace(urlAfterBasename));

        if(params.url === "/Fetcher") {
            store.dispatch(FetcherActions.GetData());
        }
        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin
        const routerContext = {};
        const app = (
            <Provider store={store}>
                <StaticRouter basename={basename} context={routerContext} location={params.location.path} children={routes} />
            </Provider>
        );
        renderToString(app);

        // If there's a redirection, just send this information back to the host application
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }

        // Once any async tasks are done, we can perform the final render
        // We also send the redux store state, so the client can continue execution where the server left off

        // eslint-disable-next-line
        params.domainTasks.then(() => {
            resolve({
                html: renderToString(app),
                globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
});
