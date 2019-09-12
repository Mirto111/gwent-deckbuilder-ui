import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gallery from './Gallery';
import Deck from './Deck';
import Leaders from './Leaders';
import {
  ADD_FILTERS_LEADERS,
  ADD_FILTERED_CARDS,
  SET_SELECT_LEADER,
  EDIT_DECK,
} from '../constants/actionTypes';

const isSearched = (searchTerm) => (item) => item.faction.includes(searchTerm.faction) || item.faction === 'Neutral';

class DeckBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provision: 0,
      maxProvision: 150,
      cardsContained: 0,
      minCards: 25,
      unitsContained: 0,
      minUnits: 13,
      scraps: 0,
      deck: {},
      leader: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDeck = this.handleClickDeck.bind(this);
    this.handleClickLeader = this.handleClickLeader.bind(this);
  }

  handleClick(item, e) {
    const id = item._id;
    const elem = document.getElementById(item._id);
    const { deck } = this.state;

    if (!elem.classList.contains('disabled')) {
      const card = {};

      const quant = deck[id] !== undefined ? deck[id].quantity + 1 : 1;
      card[item._id] = item.cardTier === 'Gold' ? { ...item } : { ...item, quantity: quant };
      let nDeck = { ...deck, ...card };

      nDeck = this.sortDeck(nDeck);

      this.props.setDeck(nDeck);
      this.setState((state) => {
        const unitsContained = item.cardType === 'Unit'
          ? this.state.unitsContained + 1
          : this.state.unitsContained;
        const scraps = this.getCardScraps(item.rarity) + this.state.scraps;
        return {
          deck: nDeck,
          provision: this.state.provision + item.provision,
          cardsContained: this.state.cardsContained + 1,
          unitsContained,
          scraps,
        };
      });
    }
  }

  sortDeck(deck) {
    const peopleArray = Object.keys(deck).map((i) => deck[i]);

    peopleArray.sort((a, b) => b.provision - a.provision);

    const result = {};
    for (let i = 0; i < peopleArray.length; i++) {
      result[peopleArray[i]._id] = peopleArray[i];
    }

    return result;
  }

  getCardScraps(rarity) {
    const legendary = 800;
    const epic = 200;
    const rare = 80;
    const common = 30;

    const scraps = rarity === 'Legendary'
      ? legendary
      : rarity === 'Epic'
        ? epic
        : rarity === 'Rare'
          ? rare
          : common;
    return scraps;
  }

  handleClickLeader(item, e) {
    this.props.setLeader(item);

    if (
      Object.keys(this.props.selectLeader) === 0
      || this.props.selectLeader.faction !== item.faction
    ) {
      const leaders = this.props.leaders.filter(isSearched(item));
      const cards = this.props.cards.filter(isSearched(item));
      this.props.setFiltLead(leaders);
      this.props.setFiltCard(cards);

      // this.props.manyDisp(cards, leaders);
    }

    this.setState({
      maxProvision: 150 + item.provision,
      leader: item,
    });
  }

  handleClickDeck(item, e) {
    const { deck } = this.state;
    const id = item._id;
    const nDeck = { ...deck };
    if (deck[id].quantity !== 2) {
      delete nDeck[id];
    } else {
      nDeck[id].quantity = nDeck[id].quantity - 1;
    }
    const scraps = this.state.scraps - this.getCardScraps(item.rarity);
    const unitsContained = item.cardType == 'Unit'
      ? this.state.unitsContained - 1
      : this.state.unitsContained;
    this.props.setDeck(nDeck);
    this.setState({
      deck: nDeck,
      provision: this.state.provision - item.provision,
      cardsContained: this.state.cardsContained - 1,
      unitsContained,
      scraps,
    });
  }

  render() {
    const {
      provision,
      cardsContained,
      scraps,
      deck,
      maxProvision,
      unitsContained,
      minUnits,
    } = this.state;

    return (
      <div>
        {Object.keys(this.props.selectLeader) === 0 ? (
          <Leaders handleClickLeader={this.handleClickLeader} />
        ) : (
            <div className="row">
              <Deck
                deck={deck}
                cardsContained={cardsContained}
                maxProvision={maxProvision}
                unitsContained={unitsContained}
                minUnits={minUnits}
                provision={provision}
                handleClickDeck={this.handleClickDeck}
              />
              <div className="card-container">
                <div className="scroll">
                  <Leaders handleClickLeader={this.handleClickLeader} />
                  <Gallery handleClick={this.handleClick} />
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cards: state.cardState,
  leaders: state.leaderState.leaders,
  filtered: state.leaderState.filtered,
  selectLeader: state.leaderState.selectLeader,
});

const mapDispatchToProps = (dispatch) => ({
  setLeader: (item) => dispatch({ type: SET_SELECT_LEADER, item }),
  setFiltCard: (cards) => dispatch({ type: ADD_FILTERED_CARDS, cards }),
  setFiltLead: (leaders) => dispatch({ type: ADD_FILTERS_LEADERS, leaders }),
  setDeck: (deck) => dispatch({ type: EDIT_DECK, deck }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckBuilder);
