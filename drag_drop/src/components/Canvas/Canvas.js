import React from "react";
import "./Canvas.css";
import { useDrop } from "react-dnd";
import Card from "../Card/Card";
import { randomStringGenerator } from "../../helperFunctions";
import ItemTypes from "../../ItemTypes";
import { useRecoilState } from "recoil";
import { cardWithID } from "../../atoms";
import { canvasComponents } from "../../atoms/canvasAtoms";
import { ArcherContainer, ArcherElement } from "react-archer";
import stateHolder from "../../stateHolder";

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
      } else {
        let state = stateHolder.getState(item.id);
        console.log("This is the card to be updated : ", state);
        let updater = stateHolder.getUpdater(item.id);
        console.log("This is the updater : ", updater);
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
  console.log(stateHolder.getAllState());
  return (
    <div
      id="canvas"
      className="canvas"
      ref={drop}
      onClick={() => {
        console.log("Canvas onClick");
        stateHolder.setActiveCard("");
      }}
    >
      <ArcherContainer>
        {canvasComponentHolder.components.map((data) => {
          console.log(data);
          return <Card {...data} />;
        })}
      </ArcherContainer>
    </div>
  );
};

export default Canvas;
