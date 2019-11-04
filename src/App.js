import React, { Component} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/cards-style.css";
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import Header from "./ui/Header";
import DeckBuilder from "./ui/DeckBuilder";
import Decks from "./ui/Decks";
import DeckInfo from "./ui/DeckInfo";
import store from "./store";
import { ADD_LEADERS_CARDS, ADD_CARDS } from "./constants/actionTypes";

class App extends Component {
  partitionContent(r) {
    const leaders = [];
    const cards = [];

    for (let key = 0; key < r.length; key++) {
      if (r[key].cardTier === "Leader") {
        leaders.push(r[key]);
      } else {
        cards.push(r[key]);
      }
    }
    leaders.sort(function (a, b) {
      if (a.faction > b.faction) {
        return 1;
      }
      if (a.faction < b.faction) {
        return -1;
      }
      return 0;
    });
    cards.sort((a, b) => {
      const cardTiers = { Gold: 1, Bronze: 2 };

      return (
        b.provision -
        a.provision +
        cardTiers[a.cardTier] -
        cardTiers[b.cardTier]
      );
    });

    store.dispatch({ type: ADD_LEADERS_CARDS, leaders });
    store.dispatch({ type: ADD_CARDS, cards });
  }

  componentDidMount() {
    axios
      .get("https://gwent-deckbuilder.herokuapp.com/api/cards")
      .then(response => this.partitionContent(response.data));
  }

  render() {
    return (
      <Router>
        <Header />
        <Redirect exact from="/" to="/deckbuilder" />
        <Route exact path="/decks" component={Decks} />
        <Route path="/deckbuilder" component={DeckBuilder} />
        <Route path="/decks/:id" component={DeckInfo} />
      </Router>
    );
  }
}

export default App;
