import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
// import { stateListener } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDrag } from "react-dnd";
import ItemTypes from "../../ItemTypes";
import "./Card.css";
import stateHolder from "../../stateHolder";
import CardGenerator from "./CardGenerator";
import { cleanCard, getSourceTargetAnchors } from "./helpers";

const Card = (props) => {
  const id = props.id ? props.id : "card_component";
  if (stateHolder.getState(id)) {
    cleanCard(id);
  }

  const [cardState, updateCardState] = useRecoilState(props.atom);

  stateHolder.addState(id, cardState);
  stateHolder.addUpdater(id, updateCardState);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id: id },
    begin: (monitor) => {
      if (cardState.connectedFrom) {
        let state = stateHolder.getState(cardState.connectedFrom);
        let updater = stateHolder.getUpdater(cardState.connectedFrom);
        updater({
          ...state,
          isConnectedToDragging: true,
        });
      }
    },
    end: (item, monitor) => {
      if (cardState.connectedFrom) {
        let state = stateHolder.getState(cardState.connectedFrom);
        let updater = stateHolder.getUpdater(cardState.connectedFrom);
        updater({
          ...state,
          isConnectedToDragging: false,
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  let self = document.getElementById(id);
  let boundingBox = self
    ? self.getBoundingClientRect()
    : {
        width: 0,
        height: 0,
      };

  let canvas = document.getElementById("canvas");

  let left = Math.max(
    cardState.position.x -
      canvas.getBoundingClientRect().x -
      boundingBox.width / 2,
    0
  );

  let top = Math.max(cardState.position.y - boundingBox.height / 2, 0);

  const onFocus = () => {
    stateHolder.setActiveCard("");
    updateCardState({
      ...cardState,
      disabled: false,
    });
    stateHolder.setActiveCard();
  };

  const onBlur = () => {
    stateHolder.setActiveCard("");
    updateCardState({
      ...cardState,
      disabled: true,
    });
  };

  let archerRelations,
    archerId = id + "archer";

  if (
    cardState.connectedTo &&
    !isDragging &&
    !cardState.isConnectedToDragging
  ) {
    let targetId = cardState.connectedTo + "archer";
    const [source, target] = getSourceTargetAnchors(id, cardState.connectedTo);
    archerRelations = {
      targetId: targetId,
      targetAnchor: target,
      sourceAnchor: source,
      style: { strokeColor: "blue", strokeWidth: 1, noCurves: false },
    };
  } else {
    archerRelations = {};
  }

  const singleClickHandler = (event) => {
    let activeCard = stateHolder.getActiveCard();
    let updatedCard = {};
    Object.assign(updatedCard, cardState);
    if (activeCard) {
      if (activeCard === id) {
        stateHolder.setActiveCard("");
        return;
      }
      let state = stateHolder.getState(activeCard);
      let updater = stateHolder.getUpdater(activeCard);
      let activeCardTo = state.connectedTo;
      updater({
        ...state,
        connectedTo: id,
      });
      if (activeCardTo && activeCardTo === cardState.connectedFrom) {
        state = stateHolder.getState(activeCardTo);
        updater = stateHolder.getUpdater(activeCardTo);
        updater({
          ...state,
          connectedFrom: "",
          connectedTo: "",
        });
      } else {
        if (activeCardTo) {
          state = stateHolder.getState(activeCardTo);
          updater = stateHolder.getUpdater(activeCardTo);
          updater({
            ...state,
            connectedFrom: "",
          });
        }
        if (cardState.connectedFrom) {
          state = stateHolder.getState(cardState.connectedFrom);
          updater = stateHolder.getUpdater(cardState.connectedFrom);
          updater({
            ...state,
            connectedTo: "",
          });
        }
      }
      updatedCard.connectedFrom = activeCard;
      stateHolder.setActiveCard("");
    } else {
      stateHolder.setActiveCard(id);
    }
    event.stopPropagation();
    updateCardState({
      ...updatedCard,
      dimensions: [boundingBox.width, boundingBox.height],
    });
  };

  return (
    <CardGenerator
      mainId={id}
      textOnChange={(event) => {
        updateCardState({
          ...cardState,
          content: event.target.value,
        });
      }}
      textAreaDisabled={cardState.disabled ? "disabled" : ""}
      archerRelations={[archerRelations]}
      isDragging={isDragging}
      dragRef={drag}
      doubleClickHandler={onFocus}
      blurHandler={onBlur}
      singleClickHandler={singleClickHandler}
      mainStyle={{
        left: left,
        top: top,
        position: "absolute",
      }}
      archerId={archerId}
      textAreaValue={cardState.content}
    />
  );
};

export default Card;
