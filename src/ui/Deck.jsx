import React, { Component } from "react";
import { connect } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import powerstar from "../images/med/star.png";
import leadframe from "../images/leader-frame.png";
import bronzeframe from "../images/bronze-frame.png";
import goldenframe from "../images/golden-frame.png";
import provicon from "../images/provision-icon.png";
import cardicon from "../images/cards-icon.png";
import uniticon from "../images/helmet-icon.png";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.setKeywords = this.setKeywords.bind(this);
  }

  setKeywords(item, keywords) {
    let desc = item;
    for (let key = 0; key < keywords.length + 1; key++) {
      if (item.includes(keywords[key])) {
        const span = document.createElement("span");
        span.setAttribute("class", "keyword");
        span.innerHTML = keywords[key];

        desc = desc.replace(new RegExp(keywords[key], "g"), span.outerHTML);
      }
    }
    return desc;
  }

  render() {
    const { create, handleClickDeck, attr, deck, leader, images } = this.props;

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
            <div
              className={
                attr.cardsContained >= attr.minCards
                  ? "builder__deck-counters-current"
                  : "builder__deck-counters-current-col"
              }
            >
              {attr.cardsContained}
            </div>
            {create && (
              <div className="builder__deck-counters-limit">
                <div className="builder__deck-counters-limit-text">Min</div>
                <div className="builder__deck-counters-limit-count">
                  {attr.minCards}
                </div>
              </div>
            )}
          </div>
          <div className="builder__deck-counters-item">
            <div>
              <img
                className="builder__deck-counters-ico"
                alt="provicon"
                src={provicon}
              />
            </div>
            <div
              className={
                attr.maxProvision >= attr.provision
                  ? "builder__deck-counters-current"
                  : "builder__deck-counters-current-col"
              }
            >
              {attr.provision}
            </div>
            {create && (
              <div className="builder__deck-counters-limit">
                <div className="builder__deck-counters-limit-text">Max</div>
                <div className="builder__deck-counters-limit-count">
                  {attr.maxProvision}
                </div>
              </div>
            )}
          </div>
          <div className="builder__deck-counters-item _limit">
            <div>
              <img
                className="builder__deck-counters-ico"
                alt="uniticon"
                src={uniticon}
              />
            </div>
            <div
              className={
                attr.unitsContained >= attr.minUnits
                  ? "builder__deck-counters-current"
                  : "builder__deck-counters-current-col"
              }
            >
              {attr.unitsContained}
            </div>
            {create && (
              <div className="builder__deck-counters-limit">
                <div className="builder__deck-counters-limit-text">Min</div>
                <div className="builder__deck-counters-limit-count">
                  {attr.minUnits}
                </div>
              </div>
            )}
          </div>
        </div>
        {Object.keys(leader).length > 0 && (
          <OverlayTrigger
            placement="right-end"
            overlay={
              <UpdatingPopover
                item={leader}
                images={images}
                setKeywords={this.setKeywords(
                  leader.description,
                  leader.keywords
                )}
              />
            }
          >
            <div
              key={leader._id}
              className={[`_${leader.image}`, "deck-build__card-leader"].join(
                " "
              )}
            >
              <img className="leadframe" alt="leadframe" src={leadframe} />
              <div className="card-leader-info">
                <div className="deck-build__leader-name">{leader.name}</div>
              </div>
            </div>
          </OverlayTrigger>
        )}

        {Object.keys(deck).map(item => (
          <div key={deck[item].card._id}>
            <OverlayTrigger
              placement="right-end"
              overlay={
                <UpdatingPopover
                  item={deck[item].card}
                  images={images}
                  setKeywords={this.setKeywords(
                    deck[item].card.description,
                    deck[item].card.keywords
                  )}
                />
              }
            >
              <div
                className={[
                  "deck-build__card",
                  `_${deck[item].card.image}`
                ].join(" ")}
                onClick={
                  handleClickDeck && (e => handleClickDeck(deck[item].card, e))
                }
              >
                {deck[item].card.cardTier === "Gold" ? (
                  <img
                    className="cardframe"
                    alt="cardframe"
                    src={goldenframe}
                  />
                ) : (
                  <img
                    className="cardframe"
                    alt="cardframe"
                    src={bronzeframe}
                  />
                )}
                <div className="cardChoose">
                  <div className="deck-build__card-power">
                    {deck[item].card.strength > 0 ? (
                      <span>{deck[item].card.strength} </span>
                    ) : (
                      <img alt="star" src={powerstar} />
                    )}
                  </div>
                  <div className="deckbuild-card-name">
                    {deck[item].card.name}
                  </div>
                  <div className="deck-build__card-provision">
                    {deck[item].card.cardTier === "Bronze" && (
                      <span>x{deck[item].quantity} </span>
                    )}
                    <div className="deck-build__card-provision-ico" />
                    {deck[item].card.provision}
                  </div>
                </div>
              </div>
            </OverlayTrigger>
          </div>
        ))}
      </div>
    );
  }
}

const UpdatingPopover = React.forwardRef(
  ({ scheduleUpdate, children, item, images, setKeywords, ...props }, ref) => {
    const pr = {
      className: props.className,
      placement: props.placement,
      style: props.style
    };
    return (
      <div ref={ref} {...pr}>
        <div className="tooltiptext">
          <div className="cardTooltip">
            <img
              className="cardPop"
              alt="cardprovback"
              src={images["./card-text-popup.png"]}
            />
            <div className="cardName">{item.name}</div>
            <div className="cardDesc">
              {" "}
              {item.description && (
                <div dangerouslySetInnerHTML={{ __html: setKeywords }} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const mapStateToProps = state => ({
  leader: state.leaderState.selectLeader,
  deck: state.deckState,
  attr: state.deckAttrState,
  images: state.imageState
});

export default connect(mapStateToProps)(Deck);
