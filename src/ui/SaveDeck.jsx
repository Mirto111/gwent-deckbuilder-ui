import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

class SaveDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleSaveChange = this.handleSaveChange.bind(this);
    this.setShow = this.setShow.bind(this);
  }

  handleSaveChange(event) {
    this.props.handleSaveDeck(event);
    event.preventDefault();
  }

  setShow(item) {
    this.setState({
      show: item
    });
  }

  render() {
    const { show } = this.state;
    const { deckAttribute } = this.props;

    const enabled =
      deckAttribute.cardsContained >= deckAttribute.minCards &&
      deckAttribute.unitsContained >= deckAttribute.minUnits &&
      deckAttribute.maxProvision >= deckAttribute.provision;
    return (
      <>
        <Button
          className="saveButtonDeck"
          variant="primary"
          onClick={() => this.setShow(true)}
        >
          Save Deck
        </Button>
        {!enabled && (
          <Toast
            show={show}
            onClose={() => this.setShow(false)}
            className="toastCustom"
          >
            <Toast.Header>
              <strong className="mr-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>
              {deckAttribute.cardsContained < deckAttribute.minCards && (
                <div>
                  В деке должно быть не меньше {deckAttribute.minCards} карт,
                  сейчас {deckAttribute.cardsContained}
                </div>
              )}
              {deckAttribute.unitsContained < deckAttribute.minUnits && (
                <div>
                  В деке должно быть не меньше {deckAttribute.minUnits} отрядов,
                  сейчас {deckAttribute.unitsContained}
                </div>
              )}
              {deckAttribute.maxProvision <= deckAttribute.provision && (
                <div>
                  Количество провизии должно быть не больше{" "}
                  {deckAttribute.maxProvision}, сейчас {deckAttribute.provision}
                </div>
              )}
            </Toast.Body>
          </Toast>
        )}
        {enabled && (
          <Modal
            show={show}
            onHide={() => this.setShow(false)}
            animation={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Сохранить деку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSaveChange}>
                <Form.Group controlId="formGridAddress2">
                  <Form.Label>Название деки</Form.Label>
                  <Form.Control
                    name="deckName"
                    type="text"
                    placeholder="Введите название деки"
                    defaultValue={deckAttribute.name}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Описание деки</Form.Label>
                  <Form.Control
                    name="description"
                    placeholder="Введите описание деки"
                    as="textarea"
                    rows="5"
                    defaultValue={deckAttribute.description}
                  />
                </Form.Group>
                <Button variant="secondary" onClick={() => this.setShow(false)}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  deckAttribute: state.deckAttrState
});

export default connect(mapStateToProps)(SaveDeck);
