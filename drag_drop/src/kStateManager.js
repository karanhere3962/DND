class kSM {
  static instance = null;
  static state = {};
  static subscribed = {};
  static setDefaultOnDelete = true;
  static initialState = {};
  static stringifyForPersistence = true;
  static defaultStateName = "PersistentState";
  static persistentData = {};
  static kSMObject = {
    statesSubscribed: {},
  };

  constructor() {
    if (!kSM.instance) {
      kSM.instance = this;
      kSM.state = this.get_persistent_data() || {};
      window.addEventListener("beforeunload", this.set_persistent_data());
    }
    return kSM.instance;
  }

  get_persistent_data(state_name) {
    state_name = state_name || kSM.defaultStateName;
    let stored_data = localStorage.getItem(state_name);
    if (kSM.stringifyForPersistence) {
      stored_data = JSON.parse(stored_data);
    }
    return stored_data;
  }

  set_persistent_data(state_name) {
    state_name = state_name || kSM.defaultStateName;
    let data;
    if (Object.keys(kSM.persistentData).length === 0) {
      data = kSM.state;
    } else {
      data = kSM.persistentData;
    }
    if (kSM.stringifyForPersistence) {
      data = JSON.stringify(data);
    }
    localStorage.setItem(state_name, data);
  }

  async set_initial_state(stateObj) {
    stateObj = stateObj || kSM.initialState;
    this.should_be_object(stateObj, "Initial State");
    Object.assign(kSM.state, stateObj);
  }

  should_be_object(obj, varName) {
    varName = varName || "Obj";
    let objType = typeof obj;
    if (!(objType === "object" && obj !== null)) {
      throw `${varName} should be of type object, not ${objType}`;
    }
  }

  should_be_array(list, varName) {
    varName = varName || "Variable";
    let objType = typeof list;
    if (!Array.isArray(list)) {
      throw `${varName} should be of type Array, not ${objType}`;
    }
  }

  should_be_this(obj) {
    if (!obj || !obj.setState) {
      throw "Required parameter 'this' not passed.";
    }
  }

  get_state(state) {
    if (!kSM.state[state]) {
      this.set_initial_state();
    }
    return kSM.state[state];
  }

  async set_state(stateObj) {
    this.should_be_object(stateObj, "State");
    Object.assign(kSM.state, stateObj);
    this.update_subscribers(stateObj);
  }

  async update_subscribers(stateObj) {
    this.should_be_object(stateObj, "State");
    let statekeys = Object.keys(stateObj);
    let currState, subscribedToState, currObj;

    for (let i = 0; i < statekeys.length; i++) {
      currState = statekeys[i];
      subscribedToState = kSM.subscribed[currState] || [];

      for (let j = 0; j < subscribedToState.length; j++) {
        currObj = subscribedToState[j];

        // if obj is mounted, set the state directly
        if (currObj.state._ObjIsMounted) {
          currObj.setState({
            currState: stateObj[currState],
          });
        } else {
          // if obj is not mounted, set the state using componentDidMount method
          currObj.componentDidMount = () => {
            currObj.setState({
              currObj: stateObj[currState],
            });
            currObj.userComponentDidMount();
          };
        }
      }
    }
  }

  initialize_object(obj) {
    if (!obj.kSMObject) {
      if (obj.componentDidMount) {
        obj.userComponentDidMount = obj.componentDidMount.bind(obj);
        obj.componentDidMount = () => {
          obj.setState({ _ObjIsMounted: true });
        };
      }
      if (obj.componentWillUnmount) {
        obj.userComponentWillUnmount = obj.componentWillUnmount.bind(obj);
        obj.componentWillUnmount = () => {
          obj.setState({ _ObjIsMounted: false });
          obj.componentDidMount = obj.userComponentDidMount;
          obj.userComponentWillUnmount();
        };
      }
    }
    if (!obj.kSMObject) {
      obj.kSMObject = {};
      Object.assign(obj.kSMObject, kSM.kSMObject);
    }
    if (!obj.state) {
      obj.state = { _ObjIsMounted: false };
    } else if (!("_ObjIsMounted" in obj)) {
      obj.state["_ObjIsMounted"] = false;
    }
    return obj;
  }

  async subscribe(states, obj) {
    this.should_be_this(obj);
    this.should_be_array(states, "State list");
    obj = this.initialize_object(obj);
    let currState,
      statesToBeUpdated = {};

    for (let i = 0; i < states.length; i++) {
      currState = states[i];
      kSM.subscribed[currState] = kSM.subscribed[currState] || [];

      if (!obj.kSMObject.statesSubscribed[currState]) {
        obj.kSMObject.statesSubscribed[currState] = true;
        statesToBeUpdated[currState] = kSM.state[currState];
        kSM.subscribed[currState].push(obj);
      }
    }

    Object.assign(obj.state, statesToBeUpdated);
  }

  async define_state(stateObj, obj) {
    this.should_be_this(obj);
    this.should_be_object(stateObj);
    this.set_initial_state(stateObj);
    this.subscribe(Object.keys(stateObj), obj);
  }

  async reset_state() {
    kSM.state = {};
    this.set_initial_state();
    this.update_subscribers(kSM.state);
  }
}

const stateManager = new kSM();

export { kSM, stateManager };
