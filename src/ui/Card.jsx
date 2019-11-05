import React, { Component } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { connect } from "react-redux";

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
              <div className={"cardImg _" + item.image} />
              <div className={"cardTier " + item.cardTier.toLowerCase()} />
              <div className={"faction " + item.faction.toLowerCase()} />
              <div className={"rarity " + item.rarity.toLowerCase()} />
              <div
                className={"factionProv " + item.faction.toLowerCase() + "Prov"}
              />
              <div className="provisionImg" />
              {item.strength > 0 ? (
                <div className="strength">{item.strength}</div>
              ) : (
                <div
                  className={"cardType " + item.cardType.toLowerCase() + "Type"}
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
            <div className="cardPop"></div>
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
