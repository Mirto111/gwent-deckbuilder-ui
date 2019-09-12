import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {
  ADD_FILTERS_LEADERS,
  ADD_FILTERED_CARDS,
  SET_SELECT_LEADER,
  GET_FILTERS_CARDS,
} from '../constants/actionTypes';

class FilterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterProv: 'All',
      filterCardType: 'All',
      filterRarity: 'All',
      filterFaction: '',
      search: '',
      faction: [
        'Monster',
        'Nilfgaard',
        'Scoiatael',
        'Northern_Realms',
        'Skellige',
        'Syndicate',
      ],
      prov: ['All', '1-4', '5', '6', '7', '8', '9', '10', '11+'],
      cardType: ['All', 'Artifact', 'Spell', 'Unit'],
      rarity: ['All', 'Legendary', 'Epic', 'Rare', 'Common'],
    };

    this.handleChange = this.handleChange.bind(this);
    this.setProvision = this.setProvision.bind(this);
    this.setCardType = this.setCardType.bind(this);
    this.setCardRare = this.setCardRare.bind(this);
    this.setFaction = this.setFaction.bind(this);
  }

  setProvision(e) {
    this.setState({ filterProv: e.target.value }, () => {
      this.updateFilter();
    });
  }

  setCardType(e) {
    this.setState({ filterCardType: e.target.value }, () => {
      this.updateFilter();
    });
  }

  setCardRare(e) {
    this.setState({ filterRarity: e.target.value }, () => {
      this.updateFilter();
    });
  }

  setFaction(e) {
    const item = {};
    store.dispatch({ type: SET_SELECT_LEADER, item });

    const leaders = this.props.leaders.filter(this.isSearched(e.target.value));
    store.dispatch({ type: ADD_FILTERS_LEADERS, leaders });

    const cards = this.props.cards.filter(this.isSearched(e.target.value));
    store.dispatch({ type: ADD_FILTERED_CARDS, cards });
    this.setState({ filterFaction: e.target.value }, () => {
      this.updateFilter();
    });
  }

  isSearched(searchTerm) {
    return (item) => item.faction.includes(searchTerm) || item.faction === 'Neutral';
  }

  handleChange(e) {
    this.setState({ search: e.target.value.toLowerCase() }, () => {
      // this.updateFilter();
    });
  }


  searchFilter(item) {
    const { search } = this.state;

    if (search.length > 1) {
      const cardName = item.name.toLowerCase();
      const cardDesc = item.description.toLowerCase();
      const cardCategories = item.categories.toString().toLowerCase();
      return (
        cardName.includes(search)
        || cardDesc.includes(search)
        || cardCategories.includes(search)
      );
    }
    return true;
  }

  isFiltered() {
    return (item) => this.searchFilter(item) && this.comboFilter(item);
  }

  updateFilter() {
    const filtered = this.props.filterCards.filter(this.isFiltered());

    store.dispatch({ type: GET_FILTERS_CARDS, filtered });
  }

  comboFilter(item) {
    const {
      filterProv,
      filterCardType,
      filterRarity,
    } = this.state;

    const keys = {};
    if (filterProv !== 'All') {
      keys.provision = filterProv;
    }
    if (filterCardType !== 'All') {
      keys.cardType = filterCardType;
    }
    if (filterRarity !== 'All') {
      keys.rarity = filterRarity;
    }

    for (const key in keys) {
      if (keys[key] === '1-4' && item[key] <= 4) {
        continue;
      }
      if (keys[key] === '11+' && item[key] >= 11) {
        continue;
      }

      if (item[key] === undefined || item[key] !== keys[key]) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { prov, cardType, rarity } = this.state;

    return (
      <div className="filters">
        <div className="inline">
          <div>Select a faction:</div>
          <label>
            <input
              type="radio"
              onChange={this.setFaction}
              name="faction"
              value="Monster"
            />
            <span className="btn-monster" />
          </label>
          <label>
            <input
              type="radio"
              onChange={this.setFaction}
              name="faction"
              value="Nilfgaard"
            />
            <span className="btn-nilf" />
          </label>
          <label>
            <input
              type="radio"
              onChange={this.setFaction}
              name="faction"
              value="Northern_Realms"
            />
            <span className="btn-north" />
          </label>
          <label>
            <input
              type="radio"
              onChange={this.setFaction}
              name="faction"
              value="Scoiatael"
            />
            <span className="btn-skoi" />
          </label>
          <label>
            <input
              type="radio"
              onChange={this.setFaction}
              name="faction"
              value="Skellige"
            />
            <span className="btn-skel" />
          </label>
          <label>
            <input
              type="radio"
              onChange={this.setFaction}
              name="faction"
              value="Syndicate"
            />
            <span className="btn-synd" />
          </label>
        </div>
        <div className="inline">
          <div>Search a card by any keyword</div>
          <input
            type="text"
            className="input"
            onChange={this.handleChange}
            placeholder="Search..."
          />
        </div>
        <div />
        <div className="inline">
          <div>Provision</div>
          {prov.map((item) => (
            <Label
              key={item}
              value={item}
              onChange={this.setProvision}
              name="prov"
            />
          ))}
        </div>
        <div className="inline">
          <div>Cards Type</div>
          {cardType.map((item) => (
            <Label
              key={item}
              value={item}
              onChange={this.setCardType}
              name="card-type"
            />
          ))}
        </div>
        <div className="inline">
          <div>Cards Rarity</div>
          {rarity.map((item) => (
            <Label
              key={item}
              value={item}
              onChange={this.setCardRare}
              name="rare"
            />
          ))}
        </div>
      </div>
    );
  }
}
const Label = ({ value, onChange, name }) => (
  <label>
    {value === 'All' ? (
      <input
        type="radio"
        onChange={onChange}
        value={value}
        name={name}
        defaultChecked
      />
    ) : (
      <input type="radio" onChange={onChange} value={value} name={name} />
    )}

    <span>{value}</span>
  </label>
);

const mapStateToProps = (state) => ({
  cards: state.cardState,
  filterCards: state.filteredCardState.cards,
  leaders: state.leaderState.leaders,
});

export default connect(mapStateToProps)(FilterGroup);
