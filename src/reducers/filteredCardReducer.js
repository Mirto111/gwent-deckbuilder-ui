import {
  ADD_FILTERED_CARDS,
  GET_FILTERS_CARDS
} from "../constants/actionTypes";

const INITIAL_STATE = { cards: [], filtered: [] };

function filteredCardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_FILTERED_CARDS: {
      return {
        ...state,
        cards: action.cards
      };
    }
    case GET_FILTERS_CARDS: {
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
