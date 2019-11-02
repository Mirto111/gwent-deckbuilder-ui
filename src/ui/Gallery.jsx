import React from "react";
import { connect } from "react-redux";
import Card from "./Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Gallery = props => {
  const { deck, handleClick, filterByCategories} = props;
  return (
    <div className="clearfix">
      <Container fluid="true">
        <h4>Cards</h4>
        <Row>
          {filterByCategories.map(item =>
            deck[item._id] !== undefined ? (
              <Card
                key={item._id}
                item={item}
                handleClick={e => handleClick(item, e)}
                quantity={deck[item._id].quantity}
                disabled={
                  deck[item._id].card.cardTier !== "Bronze" ||
                  deck[item._id].quantity === 2
                }
              />
            ) : (
              <Card
                key={item._id}
                item={item}
                handleClick={e => handleClick(item, e)}
                quantity={0}
                disabled={false}
              />
            )
          )}
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  filterByCategories: state.filteredCardState.filtered,
  deck: state.deckState
});

export default connect(mapStateToProps)(Gallery);
