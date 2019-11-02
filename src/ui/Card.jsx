import React, { Component } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { connect } from "react-redux";

const RARITY = {
  Rare: "./rarity-rare.png",
  Legendary: "./rarity-leg.png",
  Epic: "./rarity-epic.png",
  Common: "./rarity-common.png"
};
const CARD_TIERS = {
  Leader: "./card-frame-leader.png",
  Bronze: "./card-frame-bronze.png",
  Gold: "./card-frame-gold.png"
};

const CARD_TYPES = {
  Unit: "./card-banner-nt.png",
  Spell: "./media-spell1.png",
  Artifact: "./media.png",
  Leader: "./media-leader.png"
};

const FACTION = {
  Monster: "./card-banner-mo.png",
  Neutral: "./card-banner-nt.png",
  Nilfgaard: "./card-banner-ng.png",
  Scoiatael: "./card-banner-sc.png",
  Northern_Realms: "./card-banner-nr.png",
  Skellige: "./card-banner-sk.png",
  Syndicate: "./card-banner-nt.png"
};

const FACTION_PROV = {
  Monster: "./cardns-mo.png",
  Neutral: "./cardns-nt.png",
  Nilfgaard: "./cardns-ng.png",
  Scoiatael: "./cardns-sc.png",
  Northern_Realms: "./cardns-nr.png",
  Skellige: "./cardns-sk.png",
  Syndicate: "./cardns-nt.png"
};

class Card extends Component {
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
    const { item, quantity, disabled, handleClick, images } = this.props;

    return (
      <div>
        <OverlayTrigger
          placement="top"
          overlay={
            <UpdatingPopover
              item={item}
              images={images}
              setKeywords={this.setKeywords(item.description, item.keywords)}
            />
          }
        >
          <div className="builder__card">
            <div
              id={item._id}
              onClick={handleClick}
              className={["gallery", disabled && "disabled"].join(" ")}
            >
              <img
                className="image1"
                alt={item.image}
                src={images[`./${item.image}.jpg`]}
              />
              <img
                className="image2"
                alt="cardframe"
                src={images[CARD_TIERS[item.cardTier]]}
              />
              <img
                className="image3"
                alt="banner"
                src={images[FACTION[item.faction]]}
              />
              <img
                className="image4"
                alt="rarity"
                src={images[RARITY[item.rarity]]}
              />
              <img
                className="image5"
                alt="cardprovback"
                src={images[FACTION_PROV[item.faction]]}
              />
              <img
                className="image6"
                alt="provision"
                src={images["./median.png"]}
              />
              {item.strength > 0 ? (
                <div className="strength">{item.strength}</div>
              ) : (
                <img
                  className="image7"
                  alt="strength"
                  src={images[CARD_TYPES[item.cardType]]}
                />
              )}

              <div className="provision">{item.provision}</div>
            </div>
            {item.cardTier === "Bronze" && quantity > 0 && (
              <div className="builder__card-count">{quantity}</div>
            )}
          </div>
        </OverlayTrigger>
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
  images: state.imageState
});

export default connect(mapStateToProps)(Card);
