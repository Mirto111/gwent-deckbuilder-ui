import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Gallery from "./Gallery";
import FilterGroup from "./FilterGroup";
import Deck from "./Deck";
import Leaders from "./Leaders";
import SaveDeck from "./SaveDeck";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { EDIT_DECK, EDIT_DECK_ATTR } from "../constants/actionTypes";

class DeckBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDeck = this.handleClickDeck.bind(this);
    this.handleSaveDeck = this.handleSaveDeck.bind(this);
  }

  handleClick(item, e) {
    const id = item._id;
    const elem = document.getElementById(item._id);
    const { deck, attr } = this.props;

    if (!elem.classList.contains("disabled")) {
      let nDeck = {};
      nDeck = Object.assign(nDeck, deck);
      const quant = deck[id] !== undefined ? nDeck[id].quantity + 1 : 1;
      nDeck[id] = { card: item, quantity: quant };
      nDeck = this.sortDeck(nDeck);

      const unitsContained =
        item.cardType === "Unit"
          ? attr.unitsContained + 1
          : attr.unitsContained;
      const scraps = this.getCardScraps(item.rarity) + attr.scraps;
      const provision = attr.provision + item.provision;
      const cardsContained = attr.cardsContained + 1;

      const attributes = { provision, cardsContained, unitsContained, scraps };
      this.props.setDeckAttr(attributes);

      this.props.setDeck(nDeck);
      this.setState({ saved: false });
    }
  }

  handleClickDeck(item, e) {
    const { deck, attr } = this.props;

    const id = item._id;
    const nDeck = { ...deck };

    if (deck[id].quantity !== 2) {
      delete nDeck[id];
    } else {
      nDeck[id].quantity = nDeck[id].quantity - 1;
    }
    const scraps = attr.scraps - this.getCardScraps(item.rarity);
    const unitsContained =
      item.cardType == "Unit" ? attr.unitsContained - 1 : attr.unitsContained;
    const cardsContained = attr.cardsContained - 1;
    const provision = attr.provision - item.provision;

    const attributes = { provision, cardsContained, unitsContained, scraps };

    this.props.setDeckAttr(attributes);
    this.props.setDeck(nDeck);
    this.setState({ saved: false });
  }

  handleSaveDeck(event) {
    const { deck, selectLeader, attr } = this.props;

    let nDeck = {};
    const form = event.target;

    nDeck = { ...nDeck, ...attr };
    nDeck.leader = selectLeader;
    nDeck.name = form.elements.deckName.value;

    nDeck.deckList = Object.values(deck);

    nDeck.description = form.elements.description.value;

    axios
      .post("https://gwent-deckbuilder.herokuapp.com/api/decks", nDeck)
      .then(response => {
        this.setState({
          id: response.data._id,
          saved: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  sortDeck(deck) {
    const peopleArray = Object.keys(deck).map(i => deck[i]);

    peopleArray.sort((a, b) => b.card.provision - a.card.provision);

    const result = {};
    for (let i = 0; i < peopleArray.length; i++) {
      result[peopleArray[i].card._id] = peopleArray[i];
    }

    return result;
  }

  getCardScraps(rarity) {
    const legendary = 800;
    const epic = 200;
    const rare = 80;
    const common = 30;

    const scraps =
      rarity === "Legendary"
        ? legendary
        : rarity === "Epic"
        ? epic
        : rarity === "Rare"
        ? rare
        : common;
    return scraps;
  }

  render() {
    const { saved } = this.state;

    return (
      <Container fluid="true">
        <FilterGroup />
        {this.props.filtered.length === 0 ? (
          <Row>
            <Col>
              <Leaders handleClickLeader={this.handleClickLeader} />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg={4}>
              <Deck
                create={true}
                handleClickDeck={this.handleClickDeck}
                handleSaveDeck={this.handleSaveDeck}
              />
              {saved && <Saved />}
              {Object.keys(this.props.deck).length > 0 && !saved && (
                <SaveDeck handleSaveDeck={this.handleSaveDeck} />
              )}
            </Col>
            <Col lg={8}>
              <div className="scroll" id="style-1">
                <Leaders handleClickLeader={this.handleClickLeader} />
                <Gallery handleClick={this.handleClick} />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const Saved = () => <Alert variant="success">Saved</Alert>;

const mapStateToProps = state => ({
  selectLeader: state.leaderState.selectLeader,
  filtered: state.leaderState.filtered,
  deck: state.deckState,
  attr: state.deckAttrState
});

const mapDispatchToProps = dispatch => ({
  setDeck: deck => dispatch({ type: EDIT_DECK, deck }),
  setDeckAttr: attr => dispatch({ type: EDIT_DECK_ATTR, attr })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckBuilder);
