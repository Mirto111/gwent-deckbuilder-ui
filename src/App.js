import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/cards-style.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Header from './ui/Header';
import DeckBuilder from './ui/DeckBuilder';
import DeckLayout from './layout/DeckLayout';
import DeckBuilderLayout from './layout/DeckBuilderLayout';
import LeadersLayout from './layout/LeadersLayout';
import FilterGroup from './ui/FilterGroup';
import store from './store';
import {
 ADD_LEADERS_CARDS, ADD_CARDS, ADD_FILTERED_CARDS, GET_FILTERS_LEADERS 
} from './constants/actionTypes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     filtered: [],
    };
  }

  partitionContent(r) {
    const leaders = [];
    const cards = [];
    const empty = [];

    for (let key = 0; key < r.length; key++) {
      if (r[key].cardTier === 'Leader') {
        leaders.push(r[key]);
      } else {
        cards.push(r[key]);
      }
    }

    cards.sort((a, b) => {
        const cardTiers = {"Gold":1, "Bronze":2};

      return (b.provision - a.provision + cardTiers[a.cardTier] - cardTiers[b.cardTier]);
    });

    store.dispatch({ type: ADD_LEADERS_CARDS, leaders });
    store.dispatch({ type: ADD_CARDS, cards });
    // store.dispatch({ type: ADD_FILTERED_CARDS, cards });
    // store.dispatch({ type: GET_FILTERS_LEADERS, empty});

    // this.setState({filtered: others});
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/api/cards')
      .then((response) => this.partitionContent(response.data));
  }


  render() {
    const { filtered } = this.state;

    return (
      <Router>
        <Header />
        <FilterGroup />
        <Route path="/decks" component={DeckLayout} />
        <Route path="/deckbuilder" component={DeckBuilder} />
      </Router>

    );
  }
}


export default App;
