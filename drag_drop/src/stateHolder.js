export class StateHolder {
  static states = {};
  static updater = {};
  static activeCard = "";
  static currentlyDragging = {};

  addState(key, state) {
    StateHolder.states[key] = state;
  }

  getState(key) {
    return StateHolder.states[key];
  }

  addUpdater(key, updater) {
    StateHolder.updater[key] = updater;
  }

  getUpdater(key) {
    return StateHolder.updater[key];
  }

  setActiveCard(id) {
    StateHolder.activeCard = id;
  }

  getActiveCard() {
    return StateHolder.activeCard;
  }

  getAllState() {
    return StateHolder.states;
  }

  addCurrentlyDragging(id) {
    StateHolder.currentlyDragging[id] = true;
  }

  isCurrentlyDragging(id) {
    return StateHolder.currentlyDragging[id];
  }

  removeCurrentlyDragging(id) {
    if (StateHolder.currentlyDragging[id]) {
      delete StateHolder.currentlyDragging[id];
    }
  }
}

export default new StateHolder();
