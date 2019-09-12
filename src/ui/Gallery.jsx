import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';

const Gallery = (props) => {
  const {
    deck, handleClick, cards, filtered,
  } = props;
  const gal = filtered.length > 0 ? filtered : cards;

  return (
    <div className="clearfix">
      <h4>Cards</h4>
      <hr />
      <div>
        {(gal).map((item) => (deck[item._id] !== undefined ? (
          <Card
            key={item._id}
            item={item}
            handleClick={(e) => handleClick(item, e)}
            quantity={deck[item._id].quantity}
            disabled={
              deck[item._id].cardTier !== 'Bronze'
              || deck[item._id].quantity === 2
            }
          />
        ) : (
          <Card
            key={item._id}
            item={item}
            handleClick={(e) => handleClick(item, e)}
            quantity={0}
            disabled={false}
          />
        )))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cards: state.filteredCardState.cards,
  filtered: state.filteredCardState.filtered,
  deck: state.deckState.deck,
});

export default connect(
  mapStateToProps,
)(Gallery);
