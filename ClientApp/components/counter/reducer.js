import * as t from "./actionsType";

// -----------------
// STATE

export const State = {
    count: 0
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state = State, action) => {
    switch (action.type) {
        case t.IncrementCount:
            return { count: state.count + 1 };
        case t.DecrementCount:
            return { count: state.count - 1 };
        default:
            return state;
    }
};
