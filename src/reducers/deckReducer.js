import { EDIT_DECK } from "../constants/actionTypes";

const INITIAL_STATE = {};

function deckReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_DECK: {
      return Object.assign({}, action.deck);
    }
    default:
      return state;
  }
}

export default deckReducer;
