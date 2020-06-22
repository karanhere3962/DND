import React from "react";
import Card from "../Card/Card";
import { ArcherContainer, ArcherElement } from "react-archer";
import "./Canvas.css";

const CanvasGenerator = (props) => {
  return (
    <div
      id="canvas"
      className="canvas"
      ref={props.componentRef}
      onClick={props.componentOnClick}
    >
      <ArcherContainer>
        {props.components.map((data) => {
          console.log(data);
          return <Card {...data} />;
        })}
      </ArcherContainer>
    </div>
  );
};

export default CanvasGenerator;
