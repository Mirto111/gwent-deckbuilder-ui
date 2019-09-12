import { EDIT_DECK } from '../constants/actionTypes';

const INITIAL_STATE = { deck: {} };

function deckReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_DECK: {
      return {
        ...state,
        deck: action.deck
      };
    }
    default:
      return state;
  }
}

export default deckReducer;
