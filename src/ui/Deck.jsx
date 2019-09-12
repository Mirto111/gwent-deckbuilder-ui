import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import powerstar from '../images/med/star.png';
import leadframe from '../images/leader-frame.png';
import bronzeframe from '../images/bronze-frame.png';
import goldenframe from '../images/golden-frame.png';
import popup from '../images/med/card-text-popup.png';
import provicon from '../images/provision-icon.png';
import cardicon from '../images/cards-icon.png';
import uniticon from '../images/helmet-icon.png';

const Deck = (props) => {
  const {
    provision,
    cardsContained,
    scraps,
    deck,
    maxProvision,
    unitsContained,
    minUnits,
    handleClickDeck,
    selectLeader,
  } = props;

  return (
    <div className="deck-build deck-container">
      <div className="builder__deck-counters">
        <div className="builder__deck-counters-item _limit">
          <div>
            <img
              className="builder__deck-counters-ico "
              alt="cardicon"
              src={cardicon}
            />
          </div>
          <div className="builder__deck-counters-current">
            {cardsContained}
          </div>
          <div className="builder__deck-counters-limit">
            <div className="builder__deck-counters-limit-text">Min</div>
            <div className="builder__deck-counters-limit-count">25</div>
          </div>
        </div>
        <div className="builder__deck-counters-item">
          <div>
            <img
              className="builder__deck-counters-ico"
              alt="provicon"
              src={provicon}
            />
          </div>
          <div className="builder__deck-counters-current">{provision}</div>
          <div className="builder__deck-counters-limit">
            <div className="builder__deck-counters-limit-text">Max</div>
            <div className="builder__deck-counters-limit-count">
              {maxProvision}
            </div>
          </div>
        </div>
        <div className="builder__deck-counters-item _limit">
          <div>
            <img
              className="builder__deck-counters-ico"
              alt="uniticon"
              src={uniticon}
            />
          </div>
          <div className="builder__deck-counters-current">
            {unitsContained}
          </div>
          <div className="builder__deck-counters-limit">
            <div className="builder__deck-counters-limit-text">Min</div>
            <div className="builder__deck-counters-limit-count">
              {minUnits}
            </div>
          </div>
        </div>
      </div>
      {selectLeader.image}
      {Object.keys(selectLeader).length > 0 && (
        <div
          className={[
            `_${selectLeader.image}`,
            'deck-build__card-leader',
          ].join(' ')}
        >
          <img className="leadframe" alt="leadframe" src={leadframe} />
          <div className="card-leader-info">
            <div className="deck-build__leader-name">{selectLeader.name}</div>
          </div>
        </div>
      )}

      {Object.keys(deck).map((item) => (
        <div
          key={deck[item]._id}
          className={['deck-build__card', `_${deck[item].image}`].join(' ')}
          onClick={(e) => handleClickDeck(deck[item], e)}
        >
          <Tooltip item={deck[item]} />
          {deck[item].cardTier === 'Gold' ? (
            <img className="cardframe" alt="cardframe" src={goldenframe} />
          ) : (
            <img className="cardframe" alt="cardframe" src={bronzeframe} />
            )}

          <div className="cardChoose" key={item}>
            <div className="deck-build__card-power">
              {deck[item].strength > 0 ? (
                <span>
                  {deck[item].strength}
                  {' '}
                </span>
              ) : (
                <img alt="star" src={powerstar} />
                )}
            </div>
            <div className="deckbuild-card-name">{deck[item].name}</div>
            <div className="deck-build__card-provision">
              {deck[item].quantity > 0 ? (
                <span>
                  x
                  {deck[item].quantity}
                  {' '}
                </span>
              ) : (
                <span>{deck[item].quantity}</span>
                )}
              <div className="deck-build__card-provision-ico" />
              {deck[item].provision}
            </div>
          </div>
        </div>
      ))}
      <SaveDeck />
    </div>
  );
};


const Tooltip = ({ item }) => (
  <div
    id={`tooltip-${item.image}`}
    role="tooltip"
    className="tooltiptext-right"
  >
    <div className="cardTooltip">
      <img className="cardPop" alt="cardprovback" src={popup} />
      <div className="cardName">{item.name}</div>
      <div className="cardDesc">{item.description}</div>
    </div>
  </div>
);

const SaveDeck = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Сохранить деку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGridAddress2">
              <Form.Label>Название деки</Form.Label>
              <Form.Control placeholder="Введите название деки" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Описание деки</Form.Label>
              <Form.Control placeholder="Введите описание деки" as="textarea" rows="3" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  selectLeader: state.leaderState.selectLeader,
});

export default connect(mapStateToProps)(Deck);
