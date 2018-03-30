import * as t from "./actionsType";

// -----------------
// STATE

export const State = {
    dataList: []
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state = State, action) => {
    switch (action.type) {
        case t.GetDataRequest:
        case t.GetDataError:
        case t.PostDataRequest:
        case t.PostDataSuccess:
        case t.PostDataError:
            return state;

        case t.GetDataSuccess:
            return {
                ...state,
                dataList: action.payload
            };
            
        default:
            return state;
    }
};
