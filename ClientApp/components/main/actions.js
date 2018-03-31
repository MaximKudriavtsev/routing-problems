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