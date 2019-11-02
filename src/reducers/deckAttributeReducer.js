import { EDIT_DECK_ATTR } from "../constants/actionTypes";

const INITIAL_STATE = {
  _id: null,
  provision: 0,
  maxProvision: 150,
  cardsContained: 0,
  minCards: 25,
  unitsContained: 0,
  minUnits: 13,
  scraps: 0,
  description: null,
  name: null
};

function deckAttributeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_DECK_ATTR: {
      return {
        ...state,
        ...action.attr
      };
    }
    default:
      return state;
  }
}

export default deckAttributeReducer;
