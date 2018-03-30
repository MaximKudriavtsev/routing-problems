import * as counter from './counter/reducer';
import * as fetcher from './fetcher/reducer';

export const ApplicationState = {
    counter: counter.State,
    fetcher: fetcher.State
}

export const reducers = {
    counter: counter.reducer,
    fetcher: fetcher.reducer
};