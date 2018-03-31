export const State = {
    lat: 0,
    lng: 0,
    showModal: false,
    rows: [
      { id: 0, from: "Paris", to: "Las Vegas", volume: "300" },
      { id: 1, from: "Austin", to: "Paris", volume: "100" },
      { id: 2, from: "Las Vegas", to: "Paris", volume: "150" },
      { id: 3, from: "Austin", to: "Paris", volume: "230" },
      { id: 4, from: "Las Vegas", to: "Austin", volume: "450" }
    ],
    volume: 0,
}

export const reducer = (state = State, action) => {
    switch (action.type) {
        case 'SET_LAT':  {
            if (state.lat !== action.payload) {
                return {
                    ...state,
                    lat: action.payload
                };
            }
            return state;
        }

        case 'SET_LNG': {
            if (state.lng !== action.payload) {
                return {
                    ...state,
                    lng: action.payload
                };
            }
            return state;
        }

        case 'SET_VOLUME': {
            if (state.volume !== action.payload) {
                return {
                    ...state,
                    volume: action.payload
                };
            }
            return state;
        }

        case 'ADD_ROW': {
        debugger;
        let { rows } = state;
        const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
        const nextRows = rows.slice();
        nextRows.push({ id: startingAddedId, ...action.payload });

        return {
            ...state,
            rows: nextRows
            }
        }
        
        case 'TOGGLE_MODAL': {
        const nextShow = !state.showModal;
          return {
            ...state,
            showModal: nextShow
          }
        }
            
        default:
            return state;
    }
};
