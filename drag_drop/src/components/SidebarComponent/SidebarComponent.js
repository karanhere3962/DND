import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../../ItemTypes";
import "./SidebarComponent.css";
const SidebarComponent = (props) => {
  const id = props.id ? props.id : "cardCreator";
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARDCREATOR, id: id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  if (props.shouldBeDraggable) {
    return (
      <div
        ref={drag}
        className={isDragging ? "cardCreator dragging" : "cardCreator"}
      >
        {props.content ? props.content : "Drag and Drop on Canvas"}
      </div>
    );
  } else {
    return (
      <div className={"cardCreator"} onClick={props.onClick}>
        {props.content ? props.content : "Drag and Drop on Canvas"}
      </div>
    );
  }
};

export default SidebarComponent;
