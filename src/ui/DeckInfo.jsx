import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Deck from "./Deck";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  ADD_FILTERS_LEADERS,
  FILTERED_BY_FACTION,
  FILTERED_BY_FACTION_AND_FILTER_GROUP,
  SET_SELECT_LEADER,
  EDIT_DECK,
  EDIT_DECK_ATTR
} from "../constants/actionTypes";

class DeckInfo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.location.fromDecks) {
      axios
        .get("https://gwent-deckbuilder.herokuapp.com/api/decks/" + this.props.match.params.id)
        .then(response => this.transformResponse(response.data));
    }
  }

  transformResponse(item) {
    const deckList = item.deckList;

    const result = {};
    for (let i = 0; i < deckList.length; i++) {
      result[deckList[i].card._id] = deckList[i];
    }
    const attr = {};
    attr._id = item._id;
    attr.provision = item.provision;
    attr.maxProvision = item.maxProvision;
    attr.cardsContained = item.cardsContained;
    attr.unitsContained = item.unitsContained;
    attr.scraps = item.scraps;
    attr.description = item.description;
    attr.name = item.name;

    this.props.setDeck(result);
    this.props.setDeckAttr(attr);
    this.props.setLeader(item.leader);
  }

  handleClick() {
    const leaders = this.props.leaders.filter(
      isSearched(this.props.selectLeader)
    );
    const cards = this.props.cards.filter(isSearched(this.props.selectLeader));
    this.props.setFiltLead(leaders);
    this.props.setFiltByFaction(cards);
    this.props.setFiltByFiltersCard(cards);
  }

  //description

  render() {
    return (
      <Container fluid="true">
        <Row className="deck-info">
          <Col lg={4}>
            <Link
              to={{
                pathname: "/deckbuilder"
              }}
              onClick={this.handleClick}
            >
              <Button variant="warning">Edit Deck</Button>
            </Link>

            <Deck create={false} />
          </Col>
          <Col>
            <div>
              <h3>Description</h3>
              <div className="description">{this.props.attr.description}</div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const isSearched = searchTerm => item =>
  item.faction.includes(searchTerm.faction) || item.faction === "Neutral";

const mapStateToProps = state => ({
  cards: state.cardState,
  leaders: state.leaderState.leaders,
  selectLeader: state.leaderState.selectLeader,
  attr: state.deckAttrState
});
const mapDispatchToProps = dispatch => ({
  setFiltLead: leaders => dispatch({ type: ADD_FILTERS_LEADERS, leaders }),
  setFiltByFaction: cards => dispatch({ type: FILTERED_BY_FACTION, cards }),
  setFiltByFiltersCard: filtered =>
    dispatch({ type: FILTERED_BY_FACTION_AND_FILTER_GROUP, filtered }),
  setLeader: item => dispatch({ type: SET_SELECT_LEADER, item }),
  setDeck: deck => dispatch({ type: EDIT_DECK, deck }),
  setDeckAttr: attr => dispatch({ type: EDIT_DECK_ATTR, attr })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckInfo);
