import * as t from "./actionsType";

// ----------------
// ACTION CREATORS

export const actionCreators = {
    increment: () => ({ type: t.IncrementCount }),
    decrement: () => ({ type: t.DecrementCount })
};