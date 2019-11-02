import {
  FILTERED_BY_FACTION,
  FILTERED_BY_FACTION_AND_FILTER_GROUP
} from "../constants/actionTypes";

const INITIAL_STATE = { cards: [], filtered: [] };

function filteredCardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FILTERED_BY_FACTION: {
      return {
        ...state,
        cards: action.cards
      };
    }
    case FILTERED_BY_FACTION_AND_FILTER_GROUP: {
      return {
        ...state,
        filtered: action.filtered
      };
    }
    default:
      return state;
  }
}

export default filteredCardReducer;
