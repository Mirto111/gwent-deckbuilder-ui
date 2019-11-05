import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {
  ADD_FILTERS_LEADERS,
  SET_SELECT_LEADER,
  EDIT_DECK,
  EDIT_DECK_ATTR
} from "../constants/actionTypes";

class Decks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(item) {
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

  handleDelete(id) {
    const { decks } = this.state;

    let nDecks = decks;

    axios
      .delete("https://gwent-deckbuilder.herokuapp.com/api/decks/" + id)
      .then(response => {
        if (response.status == 200) {
          for (let i = 0; i < nDecks.length; i++) {
            if (nDecks[i]._id == id) {
              nDecks.splice(i, 1);
              break;
            }
          }
          this.setState(() => {
            return {
              decks: nDecks
            };
          });
        }
      });
  }

  componentDidMount() {
    axios
      .get("https://gwent-deckbuilder.herokuapp.com/api/decks")
      .then(response =>
        this.setState(() => {
          return {
            decks: response.data
          };
        })
      );
  }

  render() {
    const { decks } = this.state;

    return (
      <Container fluid="true">
        <div className="decks-list">
          {decks.map(item => (
            <div className="deck-item" key={item._id}>
              <Link
                className="decklink"
                to={{ pathname: "/decks/" + item._id, fromDecks: true }}
                onClick={() => this.handleClick(item)}
              >
                <div className={"deck-preview _" + item.leader.image}>
                  <div className="deck-preview__inner">
                    <div className="deck-preview__name">{item.name}</div>
                  </div>
                </div>
              </Link>
              <div>
                <DeleteAccept
                  handleDelete={() => this.handleDelete(item._id)}
                  deckName={item.name}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

const DeleteAccept = ({ handleDelete, deckName }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAccept = event => {
    setShow(false);
    handleDelete();
    event.preventDefault();
  };

  return (
    <>
      <Button className="delete-btn" variant="danger" onClick={handleShow}>
        X
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want delete {deckName}?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Form onSubmit={handleAccept}>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" type="submit">
              Yes
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setLeader: item => dispatch({ type: SET_SELECT_LEADER, item }),
  setFiltLead: leaders => dispatch({ type: ADD_FILTERS_LEADERS, leaders }),
  setDeck: deck => dispatch({ type: EDIT_DECK, deck }),
  setDeckAttr: attr => dispatch({ type: EDIT_DECK_ATTR, attr })
});

export default connect(
  null,
  mapDispatchToProps
)(Decks);
