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
    shouldBeUpdated = true;
    updatedCard.connectedTo = "";
    stateHolder.deleteStateAndUpdater(to);
  }
  if (from && !componentsHolder.components[from]) {
    shouldBeUpdated = true;
    updatedCard.connectedFrom = "";
    stateHolder.deleteStateAndUpdater(from);
  }

  if (shouldBeUpdated) {
    stateHolder.getUpdater(id)(updatedCard);
  }
};

export const getSourceTargetAnchors = (sourceId, targetId) => {
  let sourceCard = stateHolder.getState(sourceId),
    sourceAnchor;
  let targetCard = stateHolder.getState(targetId),
    targetAnchor;

  let x0 = sourceCard.position.x;
  let y0 = sourceCard.position.y;
  let x1 = targetCard.position.x;
  let y1 = targetCard.position.y;

  let deltaX = x0 - x1;
  let deltaY = y0 - y1;

  const anchors = {
    LEFT: "left",
    RIGHT: "right",
    TOP: "top",
    BOTTOM: "bottom",
  };

  if (deltaX < 0) {
    // source left
    if (deltaY < 0) {
      // source above
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        // deltaY is greater
        sourceAnchor = anchors.BOTTOM;
        targetAnchor = anchors.TOP;
      } else {
        // deltaX is greater
        sourceAnchor = anchors.RIGHT;
        targetAnchor = anchors.LEFT;
      }
    } else {
      // source below
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        // deltaY is greater
        sourceAnchor = anchors.TOP;
        targetAnchor = anchors.BOTTOM;
      } else {
        // deltaX is greater
        sourceAnchor = anchors.RIGHT;
        targetAnchor = anchors.LEFT;
      }
    }
  } else {
    if (deltaY < 0) {
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        sourceAnchor = anchors.BOTTOM;
        targetAnchor = anchors.TOP;
      } else {
        sourceAnchor = anchors.LEFT;
        targetAnchor = anchors.RIGHT;
      }
    } else {
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        sourceAnchor = anchors.TOP;
        targetAnchor = anchors.BOTTOM;
      } else {
        sourceAnchor = anchors.LEFT;
        targetAnchor = anchors.RIGHT;
      }
    }
  }
  return [sourceAnchor, targetAnchor];
  //   return ["middle", "middle"];
};
