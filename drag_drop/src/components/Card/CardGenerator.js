import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDrag } from "react-dnd";
import ItemTypes from "../../ItemTypes";
import "./Card.css";
import { ArcherContainer, ArcherElement } from "react-archer";
import stateHolder from "../../stateHolder";
import "./Card.css";

const CardGenerator = (props) => {
  return (
    <div
      ref={props.dragRef}
      onDoubleClick={props.doubleClickHandler}
      onBlur={props.blurHandler}
      onClick={props.singleClickHandler}
      id={props.mainId}
      style={props.mainStyle}
      className={
        props.isDragging
          ? "card cardDragging form-control cardSelected"
          : "card form-control cardSelected"
      }
    >
      <ArcherElement
        onClick={() => console.log("Arrow was clicked")}
        id={props.archerId}
        relations={props.archerRelations}
      >
        <textarea
          className="cardBody"
          type="text"
          onChange={props.textOnChange}
          disabled={props.textAreaDisabled}
          value={props.textAreaValue}
        />
      </ArcherElement>
    </div>
  );
};

export default CardGenerator;
