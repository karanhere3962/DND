export class StateHolder {
  static states = {};
  static updater = {};
  static activeCard = "";

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
}

export default new StateHolder();
