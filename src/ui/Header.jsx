import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  SET_SELECT_LEADER,
  ADD_FILTERS_LEADERS,
  FILTERED_BY_FACTION_AND_FILTER_GROUP,
  EDIT_DECK,
  EDIT_DECK_ATTR
} from "../constants/actionTypes";

const Header = props => {
  const handleClick = () => {
    const leader = {};
    const deck = {};
    const filterLeaders = [];
    const filtCards = [];
    const attributes = {
      _id: null,
      provision: 0,
      cardsContained: 0,
      unitsContained: 0,
      scraps: 0,
      description: null,
      name: null
    };
    props.setDeckAttr(attributes);
    props.setDeck(deck);
    props.setLeader(leader);
    props.setFiltLead(filterLeaders);
    props.setFiltCard(filtCards);
  };

  return (
    <div className="topnav">
      <nav>
        <NavLink
          to="/decks"
          exact
          activeClassName="active"
          onClick={handleClick}
        >
          Decks
        </NavLink>
        <NavLink
          to="/deckbuilder"
          activeClassName="active"
          onClick={handleClick}
        >
          DeckBuilder
        </NavLink>
      </nav>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setLeader: item => dispatch({ type: SET_SELECT_LEADER, item }),
  setFiltLead: leaders => dispatch({ type: ADD_FILTERS_LEADERS, leaders }),
  setFiltCard: filtered =>
    dispatch({ type: FILTERED_BY_FACTION_AND_FILTER_GROUP, filtered }),
  setDeck: deck => dispatch({ type: EDIT_DECK, deck }),
  setDeckAttr: attr => dispatch({ type: EDIT_DECK_ATTR, attr })
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
