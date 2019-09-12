import {
  ADD_LEADERS_CARDS,
  ADD_FILTERS_LEADERS,
  SET_SELECT_LEADER
} from "../constants/actionTypes";

const INITIAL_STATE = { selectLeader: {}, leaders: [], filtered: [] };

function leaderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_LEADERS_CARDS: {
      return {
        ...state,
        leaders: action.leaders
      };
    }
    case ADD_FILTERS_LEADERS: {
      return {
        ...state,
        filtered: action.leaders
      };
    }
    case SET_SELECT_LEADER: {
      return {
        ...state,
        selectLeader: action.item
      };
    }

    default:
      return state;
  }
}

export default leaderReducer;
