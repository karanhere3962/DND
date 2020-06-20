import React, { useRef, useLayoutEffect, useEffect } from "react";
import { cardWithID } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDrag } from "react-dnd";
import ItemTypes from "../../ItemTypes";
import "./Card.css";
import { randomStringGenerator } from "../../helperFunctions";

const Card = (props) => {
  const targetRef = useRef();
  const id = props.id ? props.id : "card_component";
  const [cardState, updateCardState] = useRecoilState(props.atom);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id: id },
    begin: (monitor) => {},
    end: (item, monitor) => {
      updateCardState({
        ...cardState,
        position: {
          x: window.event.clientX,
          y: window.event.clientY,
        },
      });
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
  console.log("This is the card state : ", cardState);
  const onFocus = () => {
    console.log("Double Clicked");
    updateCardState({
      ...cardState,
      disabled: false,
    });
  };

  const onBlur = () => {
    console.log("On Blur");
    updateCardState({
      ...cardState,
      disabled: true,
    });
  };
  return (
    <div
      onDoubleClick={onFocus}
      onBlur={onBlur}
      onClick={() => console.log("Single click")}
      id={id}
      ref={drag}
      style={{
        left: left,
        top: top,
        position: "absolute",
      }}
      className={
        isDragging ? "card cardDragging form-control" : "card form-control"
      }
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
    </div>
  );
};

export default Card;
