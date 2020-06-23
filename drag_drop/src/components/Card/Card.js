import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
// import { stateListener } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDrag } from "react-dnd";
import ItemTypes from "../../ItemTypes";
import "./Card.css";
import stateHolder from "../../stateHolder";
import CardGenerator from "./CardGenerator";
import { cleanCard } from "./helpers";

const Card = (props) => {
  const id = props.id ? props.id : "card_component";
  //   if (stateHolder.getState(id)) {
  //     cleanCard(id);
  //   }

  const [cardState, updateCardState] = useRecoilState(props.atom);

  stateHolder.addState(id, cardState);
  stateHolder.addUpdater(id, updateCardState);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id: id },
    begin: (monitor) => {
      if (cardState.connectedFrom) {
        stateHolder.updateState(cardState.connectedFrom, {
          isConnectedToDragging: true,
        });
      }
    },
    end: (item, monitor) => {
      if (cardState.connectedFrom) {
        stateHolder.updateState(cardState.connectedFrom, {
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
    console.log("Double Clicked");
    updateCardState({
      ...cardState,
      disabled: false,
    });
    stateHolder.setActiveCard();
  };

  const onBlur = () => {
    console.log("On Blur");
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
    archerRelations = {
      targetId: cardState.connectedTo + "archer",
      targetAnchor: "top",
      sourceAnchor: "bottom",
      style: { strokeColor: "blue", strokeWidth: 1, noCurves: true },
    };
  } else {
    archerRelations = {};
  }

  const singleClickHandler = (event) => {
    let activeCard = stateHolder.getActiveCard();
    let updatedCard = {};
    Object.assign(updatedCard, cardState);
    if (activeCard) {
      console.log("Completing connection with ", activeCard, "from ", id);
      let state = stateHolder.getState(activeCard);
      let updater = stateHolder.getUpdater(activeCard);
      let activeCardTo = state.connectedTo;
      updater({
        ...state,
        connectedTo: id,
      });
      if (activeCardTo) {
        state = stateHolder.getState(activeCardTo);
        updater = stateHolder.getUpdater(activeCardTo);
        updater({
          ...state,
          connectedFrom: "",
        });
      }
      console.log("Updating from card for ", id, " with ", activeCard);
      updatedCard.connectedFrom = activeCard;
      stateHolder.setActiveCard("");
    } else {
      console.log("Setting active card : ", id);
      stateHolder.setActiveCard(id);
    }
    event.stopPropagation();
    updateCardState({
      ...updatedCard,
      dimensions: [boundingBox.width, boundingBox.height],
    });
  };

  console.log("This is the state : ", stateHolder.getAllState());
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
