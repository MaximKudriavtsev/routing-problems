export const State = {
    lat: 0,
    lng: 0,
    from: '',
    to: '',
    showModal: false,
    rows: [
      { id: 0, from: "-33.890542,151.274856", to: "-33.923036,151.259052", volume: "300" },
      { id: 1, from: "-34.028249,151.157507", to: "-33.80010128657071,151.28747820854187", volume: "100" },
      { id: 2, from: "-33.950198,151.259302", to: "-33.923036,151.157507", volume: "150" },
    ],
    volume: 0,
    loading: false
}

// locations = [
//     ['Bondi Beach', -33.890542, 151.274856, 4],
//     ['Coogee Beach', -33.923036, 151.259052, 5],
//     ['Cronulla Beach', -34.028249, 151.157507, 3],
//     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//     ['Maroubra Beach', -33.950198, 151.259302, 1]
//   ];

export const reducer = (state = State, action) => {
    switch (action.type) {
        case 'LOADING': {
            return {
                ...state,
                loading: true
            };
        }
        case 'RESPONSE': {
            return {
                ...state,
                loading: false
            };
        }
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

        case 'SET_FROM':  {
            if (state.lat !== action.payload) {
                return {
                    ...state,
                    from: action.payload
                };
            }
            return state;
        }

        case 'SET_TO': {
            if (state.lng !== action.payload) {
                return {
                    ...state,
                    to: action.payload
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
