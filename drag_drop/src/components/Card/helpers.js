import stateHolder from "../../stateHolder";

export const cleanCard = (id) => {
  let card = stateHolder.getState(id),
    componentsHolder = stateHolder.getState("canvasComponentsHolder"),
    shouldBeUpdated = false;
  let to = card.connectedTo,
    from = card.connectedFrom,
    updatedCard = {};
  Object.assign(updatedCard, card);

  if (to && !componentsHolder.components[to]) {
    console.log("changing to");
    shouldBeUpdated = true;
    updatedCard.connectedTo = "";
    stateHolder.deleteStateAndUpdater(to);
  }
  if (from && !componentsHolder.components[from]) {
    console.log("changing from");
    shouldBeUpdated = true;
    updatedCard.connectedFrom = "";
    stateHolder.deleteStateAndUpdater(from);
  }

  if (shouldBeUpdated) {
    console.log("Cleaning card :", id);
    stateHolder.getUpdater(id)(updatedCard);
  }
};
