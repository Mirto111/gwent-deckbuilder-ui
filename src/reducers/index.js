import { combineReducers } from 'redux';
import imagesReducer from './imagesReducer';
import cardReducer from './cardReducer';
import leaderReducer from './leaderReducer';
import filteredCardReducer from './filteredCardReducer';
import deckReducer from './deckReducer';


const rootReducer = combineReducers({
  imageState: imagesReducer,
  cardState: cardReducer,
  leaderState: leaderReducer,
  filteredCardState: filteredCardReducer,
  deckState: deckReducer
});

export default rootReducer;
