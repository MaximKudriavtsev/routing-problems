import * as t from "./actionsType";
import { fetch, addTask } from 'domain-task';
// ----------------
// ACTION CREATORS

export const PostData = (text) => (dispatch) => {
    const fetchTask = fetch('/api/PostParent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ Data: text })
        }).then(val => {
            console.log(val);
            dispatch({type: t.PostDataSuccess});
        }).catch(err => {
            console.log(err);
            dispatch({type: t.PostDataError});
        });
    
    addTask(fetchTask);
    dispatch({type: t.PostDataRequest});
};

export const GetData = () => (dispatch) => {
    const fetchTask = fetch('/api/GetParentsList', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        }).then(val => {
            return val.json();
        }).then(res => {
            dispatch({type: t.GetDataSuccess, payload: res});
        })
        .catch(err => {
            console.log(err);
            dispatch({type: t.GetDataError});
        });

    addTask(fetchTask);
    dispatch({type: t.GetDataRequest});
};
