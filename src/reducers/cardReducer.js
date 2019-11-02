import { ADD_CARDS } from "../constants/actionTypes";

const INITIAL_STATE = [];

function cardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_CARDS: {
      return action.cards;
    }
    default:
      return state;
  }
}

export default cardReducer;
