import React from "react";
import "./Canvas.css";
import { useDrop } from "react-dnd";
import Card from "../Card/Card";
import { randomStringGenerator } from "../../helperFunctions";
import ItemTypes from "../../ItemTypes";
import { useRecoilState } from "recoil";
import { canvasComponents } from "../../atoms/canvasAtoms";

const Canvas = (props) => {
  const [componentsInCanvas, setComponents] = useRecoilState(canvasComponents);
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      const { x, y } = monitor.getClientOffset();
      console.log(x, y);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="canvas" ref={drop}>
      <div>{/* <Card id={"sideBarCard" + randomStringGenerator()} /> */}</div>
    </div>
  );
};

export default Canvas;
