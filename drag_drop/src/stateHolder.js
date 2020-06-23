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

  updateState(id, state) {
    let updater = this.getUpdater(id);
    let oldState = this.getState(id);
    if (updater) {
      updater({
        ...oldState,
        ...oldState,
      });
    } else {
      this.addState(id, state);
    }
  }

  removeCurrentlyDragging(id) {
    if (StateHolder.currentlyDragging[id]) {
      delete StateHolder.currentlyDragging[id];
    }
  }

  deleteState(id) {
    if (StateHolder.states[id]) {
      delete StateHolder.states[id];
    }
  }

  deleteUpdater(id) {
    if (StateHolder.updater[id]) {
      delete StateHolder.updater[id];
    }
  }

  deleteStateAndUpdater(id) {
    this.deleteState(id);
    this.deleteUpdater(id);
  }

  returnComponentJson() {
    let componentStates = {},
      states = StateHolder.states;
    Object.keys(states).map((data, index) => {
      if (states[data].id && states[data].id.includes("card_component_")) {
        componentStates[data] = states[data];
      }
    });
    return componentStates;
  }
}

export default new StateHolder();
