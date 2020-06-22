import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
// import { stateListener } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDrag } from "react-dnd";
import ItemTypes from "../../ItemTypes";
import "./Card.css";
import { ArcherContainer, ArcherElement } from "react-archer";
import stateHolder from "../../stateHolder";

const Card = (props) => {
  const targetRef = useRef();
  const id = props.id ? props.id : "card_component";
  const [cardState, updateCardState] = useRecoilState(props.atom);
  //   const [conState, conStateUpdater] = useRecoilState(stateListener);

  stateHolder.addState(id, cardState);
  stateHolder.addUpdater(id, updateCardState);
  //   stateHolder.addUpdater("conStateUpdater", conStateUpdater);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id: id },

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
  console.log("This is the active card : ", stateHolder.getActiveCard());
  let archerRelations,
    archerId = id + "archer";
  console.log("This is connectedTo : ", cardState.connectedTo);
  if (cardState.connectedTo && !isDragging) {
    archerRelations = {
      targetId: cardState.connectedTo + "archer",
      targetAnchor: "top",
      sourceAnchor: "bottom",
      style: { strokeColor: "blue", strokeWidth: 1, noCurves: true },
    };
  } else {
    archerRelations = {};
  }
  return (
    // <ArcherContainer>
    <div
      ref={drag}
      onDoubleClick={onFocus}
      onBlur={onBlur}
      onClick={(event) => {
        let activeCard = stateHolder.getActiveCard();
        if (activeCard) {
          console.log("Completing connection with ", activeCard, "from ", id);
          let state = stateHolder.getState(activeCard);
          let updater = stateHolder.getUpdater(activeCard);
          updater({
            ...state,
            connectedTo: id,
          });
          updateCardState({
            ...cardState,
            connectedFrom: activeCard,
          });
          stateHolder.setActiveCard("");
        } else {
          console.log("Setting active card : ", id);
          stateHolder.setActiveCard(id);
        }
        event.stopPropagation();
      }}
      id={id}
      style={{
        left: left,
        top: top,
        position: "absolute",
      }}
      className={
        isDragging
          ? "card cardDragging form-control cardSelected"
          : "card form-control cardSelected"
      }
    >
      <ArcherElement
        onClick={() => console.log("Arrow was clicked")}
        id={archerId}
        relations={[archerRelations]}
      >
        <textarea
          className="cardBody"
          type="text"
          onChange={(event) => {
            updateCardState({
              ...cardState,
              content: event.target.value,
            });
          }}
          disabled={cardState.disabled ? "disabled" : ""}
          value={cardState.content}
        />
      </ArcherElement>
    </div>
  );
};

export default Card;
