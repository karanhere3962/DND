import React, { useRef, useLayoutEffect, useEffect } from "react";
import { cardWithID } from "../../atoms";
import { useRecoilState } from "recoil";
import { useDrag } from "react-dnd";
import ItemTypes from "../../ItemTypes";
import "./Card.css";
import { randomStringGenerator } from "../../helperFunctions";

const Card = (props) => {
  const id = props.id ? props.id : "sideBarCard";
  console.log(id);
  const [cardState, cardStateChanger] = useRecoilState(cardWithID(id));

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id: id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  console.log("IsDragging : ", isDragging);
  return (
    <div ref={drag} className={isDragging ? "card dragging" : "card"}>
      Drag this to the canvas
    </div>
  );
};

export default Card;
