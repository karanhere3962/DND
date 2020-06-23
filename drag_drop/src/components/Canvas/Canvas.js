import React from "react";
import "./Canvas.css";
import { useDrop } from "react-dnd";
import { randomStringGenerator } from "../../helperFunctions";
import ItemTypes from "../../ItemTypes";
import { useRecoilState } from "recoil";
import { cardWithID } from "../../atoms";
import { canvasComponents } from "../../atoms/canvasAtoms";
import stateHolder from "../../stateHolder";
import CanvasGenerator from "./CanvasGenerator";

const Canvas = (props) => {
  const [canvasComponentHolder, updateCanvasComponent] = useRecoilState(
    canvasComponents
  );

  stateHolder.addState("canvasComponentsHolder", canvasComponentHolder);
  stateHolder.addUpdater("canvasComponentsHolder", updateCanvasComponent);

  const [{}, drop] = useDrop({
    accept: [ItemTypes.CARD, ItemTypes.CARDCREATOR],
    drop: (item, monitor) => {
      if (item.type === ItemTypes.CARDCREATOR) {
        let id = "card_component_" + randomStringGenerator();
        updateCanvasComponent({
          components: {
            ...canvasComponentHolder.components,
            [id]: {
              id: id,
              atom: cardWithID(id, {
                content: "Double Click to Edit Content",
                position: monitor.getClientOffset(),
              }),
            },
          },
        });
      } else {
        let state = stateHolder.getState(item.id);
        let updater = stateHolder.getUpdater(item.id);
        updater({
          ...state,
          position: monitor.getClientOffset(),
        });
      }
    },
    // hover: (item, monitor) => {
    //   let state = stateHolder.getState(item.id);
    //   if (state) {
    //     console.log("This is the card to be updated : ", state);
    //     let updater = stateHolder.getUpdater(item.id);
    //     console.log("This is the updater : ", updater);
    //     updater({
    //       ...state,
    //       position: monitor.getClientOffset(),
    //     });
    //   }
    // },
    collect: (monitor) => ({}),
  });

  return (
    <CanvasGenerator
      componentRef={drop}
      componentOnClick={() => {
        stateHolder.setActiveCard("");
      }}
      components={canvasComponentHolder.components}
    />
  );
};

export default Canvas;
