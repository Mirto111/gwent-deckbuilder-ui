import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import {
  ADD_FILTERS_LEADERS,
  FILTERED_BY_FACTION,
  FILTERED_BY_FACTION_AND_FILTER_GROUP,
  SET_SELECT_LEADER,
  EDIT_DECK,
  EDIT_DECK_ATTR
} from "../constants/actionTypes";

class Leaders extends Component {
  constructor(props) {
    super(props);
    this.handleClickLeader = this.handleClickLeader.bind(this);
  }

  handleClickLeader(item) {
    const { selectLeader } = this.props;

    if (Object.keys(selectLeader).length == 0) {
      const leaders = this.props.leaders.filter(isSearched(item));
      const cards = this.props.cards.filter(isSearched(item));
      this.props.setFiltLead(leaders);
      this.props.setFiltByFaction(cards);
      this.props.setFiltByFiltersCard(cards);
    }
    this.props.setLeader(item);
    const maxProvision = 150 + item.provision;
    const attr = { maxProvision };
    this.props.setDeckAttr(attr);
  }

  render() {
    const { filtered, leaders, selectLeader } = this.props;
    const lead = filtered.length > 0 ? filtered : leaders;
    const leads = partitionLeaders(leaders);

    return (
      <div className="clearfix">
        <Container fluid="true">
          <h4>Leaders</h4>
          <br />
          {filtered.length > 0 ? (
            lead.map(item => (
              <Card
                key={item._id}
                item={item}
                handleClick={() => this.handleClickLeader(item)}
                disabled={item._id === this.props.selectLeader._id}
              />
            ))
          ) : (
            <div>
              <h5>Monsters</h5>
              <LeadRow
                leads={leads}
                handleClickLeader={this.handleClickLeader}
                faction={"Monsters"}
                leader={selectLeader._id}
              />
              <br />
              <h5>Nilfgaard</h5>
              <LeadRow
                leads={leads}
                handleClickLeader={this.handleClickLeader}
                faction={"Nilfgaard"}
                leader={selectLeader._id}
              />
              <br />
              <h5>Scoiatael</h5>
              <LeadRow
                leads={leads}
                handleClickLeader={this.handleClickLeader}
                faction={"Scoiatael"}
                leader={selectLeader._id}
              />
              <br />
              <h5>Northern Realms</h5>
              <LeadRow
                leads={leads}
                handleClickLeader={this.handleClickLeader}
                faction={"Northern_Realms"}
                leader={selectLeader._id}
              />
              <br />
              <h5>Skellige</h5>
              <LeadRow
                leads={leads}
                handleClickLeader={this.handleClickLeader}
                faction={"Skellige"}
                leader={selectLeader._id}
              />
              <br />
              <h5>Syndicate</h5>
              <LeadRow
                leads={leads}
                handleClickLeader={this.handleClickLeader}
                faction={"Syndicate"}
                leader={selectLeader._id}
              />
            </div>
          )}
        </Container>
      </div>
    );
  }
}

const LeadRow = ({ leads, handleClickLeader, faction, leader }) => {
  return (
    <Row>
      {leads[faction].map(item => (
        <Card
          key={item._id}
          item={item}
          handleClick={() => handleClickLeader(item)}
          disabled={item._id === leader}
        />
      ))}
    </Row>
  );
};

const isSearched = searchTerm => item =>
  item.faction.includes(searchTerm.faction) || item.faction === "Neutral";

const partitionLeaders = leaders => {
  const Monsters = [];
  const Nilfgaard = [];
  const Scoiatael = [];
  const Northern_Realms = [];
  const Skellige = [];
  const Syndicate = [];

  for (let key = 0; key < leaders.length; key++) {
    switch (leaders[key].faction) {
      case "Monster":
        Monsters.push(leaders[key]);
        break;
      case "Nilfgaard":
        Nilfgaard.push(leaders[key]);
        break;
      case "Scoiatael":
        Scoiatael.push(leaders[key]);
        break;
      case "Northern_Realms":
        Northern_Realms.push(leaders[key]);
        break;
      case "Skellige":
        Skellige.push(leaders[key]);
        break;
      case "Syndicate":
        Syndicate.push(leaders[key]);
        break;
      default:
    }
  }

  return {
    Monsters,
    Nilfgaard,
    Scoiatael,
    Northern_Realms,
    Skellige,
    Syndicate
  };
};

const mapStateToProps = state => ({
  cards: state.cardState,
  leaders: state.leaderState.leaders,
  selectLeader: state.leaderState.selectLeader,
  filtered: state.leaderState.filtered
});

const mapDispatchToProps = dispatch => ({
  setLeader: item => dispatch({ type: SET_SELECT_LEADER, item }),
  setFiltByFaction: cards => dispatch({ type: FILTERED_BY_FACTION, cards }),
  setFiltByFiltersCard: filtered =>
    dispatch({ type: FILTERED_BY_FACTION_AND_FILTER_GROUP, filtered }),
  setFiltLead: leaders => dispatch({ type: ADD_FILTERS_LEADERS, leaders }),
  setDeck: deck => dispatch({ type: EDIT_DECK, deck }),
  setDeckAttr: attr => dispatch({ type: EDIT_DECK_ATTR, attr })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaders);
