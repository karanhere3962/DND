import React from "react";
import "./Card.css";
import { ArcherElement } from "react-archer";
import stateHolder, { StateHolder } from "../../stateHolder";
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
      <div className="functionHolder">
        <img src="/delete.png" onClick={() => {}} />
        <img
          src="/cancel.png"
          onClick={(event) => {
            let state = stateHolder.getState(props.mainId);
            let updater = stateHolder.getUpdater(props.mainId);

            if (state.connectedTo) {
              let toState = stateHolder.getState(state.connectedTo);
              let toUpdater = stateHolder.getUpdater(state.connectedTo);
              toUpdater({
                ...toState,
                connectedFrom: "",
              });
              updater({
                ...state,
                connectedTo: "",
              });
              stateHolder.addState(state.id, {
                ...state,
                connectedTo: "",
              });
            }
            event.stopPropagation();
          }}
        />
      </div>
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
