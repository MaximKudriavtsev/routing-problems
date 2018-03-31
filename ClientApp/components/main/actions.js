import { fetch, addTask } from 'domain-task';

export const setVolume = (volume) => {
  return ({
      payload: volume,
      type: 'SET_VOLUME'
  });
};

export const setLat = (lat) => {
    return ({
        payload: lat,
        type: 'SET_LAT'
    });
};

export const setLng = (lng) => {
    return ({
        payload: lng,
        type: 'SET_LNG'
    });
};

export const setFrom = (from) => {
  return ({
      payload: from,
      type: 'SET_FROM'
  });
};

export const setTo = (to) => {
  return ({
      payload: to,
      type: 'SET_TO'
  });
};

export const addRow = (row) => {
  return ({
    payload: row,
    type: 'ADD_ROW'
  });
}

export const toggleModal = () => {
  return ({
    type: 'TOGGLE_MODAL'
  });
}

export const postData = (text) => (dispatch) => {
  const fetchTask = fetch('/api/AddPoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ Data: text })
  }).then(val => {
      console.log(val);
      dispatch({ type: 'RESPONSE' });
  }).catch(err => {
      console.log(err);
      dispatch({ type: 'ERROR' });
  });

  console.log('ushlo');
  addTask(fetchTask);
  dispatch({ type: 'LOADING' });
};