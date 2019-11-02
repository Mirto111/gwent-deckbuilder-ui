import { SET_FILTERED_CATEGORY } from "../constants/actionTypes";

const INITIAL_STATE = {
  filterProv: "All",
  filterCardType: "All",
  filterRarity: "All",
  filterFaction: "",
  search: ""
};

function filterGroupReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FILTERED_CATEGORY: {
      return {
        ...state,
        ...action.filter
      };
    }
    default:
      return state;
  }
}

export default filterGroupReducer;
