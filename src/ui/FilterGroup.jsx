import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ADD_FILTERS_LEADERS,
  FILTERED_BY_FACTION,
  SET_SELECT_LEADER,
  FILTERED_BY_FACTION_AND_FILTER_GROUP,
  EDIT_DECK,
  EDIT_DECK_ATTR,
  SET_FILTERED_CATEGORY
} from "../constants/actionTypes";

const prov = ["All", "1-4", "5", "6", "7", "8", "9", "10", "11+"];
const cardType = ["All", "Artifact", "Spell", "Unit"];
const rarity = ["All", "Legendary", "Epic", "Rare", "Common"];
const faction = [
  "Monster",
  "Nilfgaard",
  "Scoiatael",
  "Northern_Realms",
  "Skellige",
  "Syndicate"
];

class FilterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterProv: "All",
      filterCardType: "All",
      filterRarity: "All",
      filterFaction: "",
      search: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.setProvision = this.setProvision.bind(this);
    this.setCardType = this.setCardType.bind(this);
    this.setCardRare = this.setCardRare.bind(this);
    this.setFaction = this.setFaction.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
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
    const {
      setLeader,
      setDeck,
      setDeckAttr,
      setFiltLead,
      setFiltByFactionCard,
      setFiltByFiltersCard
    } = this.props;
    const item = {};
    const deck = {};
    const attributes = {
      _id: null,
      provision: 0,
      cardsContained: 0,
      unitsContained: 0,
      scraps: 0
    };
    const filtered = [];
    setLeader(item);
    setDeck(deck);
    setDeckAttr(attributes);
    setFiltByFiltersCard(filtered);

    const leaders = this.props.leaders.filter(this.isSearched(e.target.value));
    setFiltLead(leaders);

    const cards = this.props.cards.filter(this.isSearched(e.target.value));
    setFiltByFactionCard(cards);

    /*     this.setState({ filterFaction: e.target.value }, () => {
          this.updateFilter();
        }); */
  }

  isSearched(searchTerm) {
    return item =>
      item.faction.includes(searchTerm) || item.faction === "Neutral";
  }

  handleChange(e) {
    this.setState({ search: e.target.value.toLowerCase() }, () => {
      this.updateFilter();
    });
  }

  searchFilter(item) {
    const { search } = this.state;

    if (search.length > 1) {
      const cardName = item.name.toLowerCase();
      const cardDesc = item.description.toLowerCase();
      const cardCategories = item.categories.toString().toLowerCase();
      return (
        cardName.includes(search) ||
        cardDesc.includes(search) ||
        cardCategories.includes(search)
      );
    }
    return true;
  }

  isFiltered() {
    return item => this.searchFilter(item) && this.comboFilter(item);
  }

  updateFilter() {
    const filtered = this.props.filterCards.filter(this.isFiltered());
    this.props.setFiltByFiltersCard(filtered);
  }

  comboFilter(item) {
    const { filterProv, filterCardType, filterRarity } = this.state;

    const keys = {};
    if (filterProv !== "All") {
      keys.provision = filterProv;
    }
    if (filterCardType !== "All") {
      keys.cardType = filterCardType;
    }
    if (filterRarity !== "All") {
      keys.rarity = filterRarity;
    }

    for (let key in keys) {
      if (keys[key] === "1-4" && item[key] <= 4) {
        continue;
      }
      if (keys[key] === "11+" && item[key] >= 11) {
        continue;
      }

      if (item[key] === undefined || item[key] != keys[key]) {
        return false;
      }
    }
    return true;
  }

  render() {
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
        <div className="search">
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
          {prov.map(item => (
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
          {cardType.map(item => (
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
          {rarity.map(item => (
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
    {value === "All" ? (
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

const mapStateToProps = state => ({
  cards: state.cardState,
  filterCards: state.filteredCardState.cards,
  leaders: state.leaderState.leaders,
  filterGoup: state.filterGroupState
});

const mapDispatchToProps = dispatch => ({
  setLeader: item => dispatch({ type: SET_SELECT_LEADER, item }),
  setFilterCategory: filter =>
    dispatch({ type: SET_FILTERED_CATEGORY, filter }),
  setFiltByFactionCard: cards => dispatch({ type: FILTERED_BY_FACTION, cards }),
  setFiltByFiltersCard: filtered =>
    dispatch({ type: FILTERED_BY_FACTION_AND_FILTER_GROUP, filtered }),
  setFiltLead: leaders => dispatch({ type: ADD_FILTERS_LEADERS, leaders }),
  setDeck: deck => dispatch({ type: EDIT_DECK, deck }),
  setDeckAttr: attr => dispatch({ type: EDIT_DECK_ATTR, attr })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterGroup);
