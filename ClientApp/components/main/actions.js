// ----------------
// ACTION CREATORS

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