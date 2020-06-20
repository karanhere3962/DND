import React from "react";
import "./Canvas.css";
import { useDrop } from "react-dnd";
import Card from "../Card/Card";
import { randomStringGenerator } from "../../helperFunctions";
import ItemTypes from "../../ItemTypes";
import { useRecoilState } from "recoil";
import { cardWithID } from "../../atoms";
import { canvasComponents } from "../../atoms/canvasAtoms";

const Canvas = (props) => {
  const [canvasComponentHolder, updateCanvasComponent] = useRecoilState(
    canvasComponents
  );
  const [extraProps, drop] = useDrop({
    accept: [ItemTypes.CARD, ItemTypes.CARDCREATOR],
    drop: (item, monitor) => {
      if (item.type === ItemTypes.CARDCREATOR) {
        let id = "card_component_" + randomStringGenerator();
        updateCanvasComponent({
          components: [
            ...canvasComponentHolder.components,
            {
              id: id,
              atom: cardWithID(id, {
                content: "Double Click to Edit Content",
                position: monitor.getClientOffset(),
              }),
            },
          ],
        });
      }
    },
    collect: (monitor) => ({}),
  });
  console.log(canvasComponentHolder);
  return (
    <div id="canvas" className="canvas" ref={drop}>
      {canvasComponentHolder.components.map((data) => {
        console.log(data);
        return <Card {...data} />;
      })}
    </div>
  );
};

export default Canvas;
