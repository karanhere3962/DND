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
        {Object.keys(props.components).map((key) => {
          let data = props.components[key];
          return <Card {...data} key={data.id + "key"} />;
        })}
      </ArcherContainer>
    </div>
  );
};

export default CanvasGenerator;
