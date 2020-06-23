import { atom } from "recoil";

const DefaultState = {
  dimensions: [],
  placeholder: "Enter your content.",
  content: "",
  connectedFrom: "",
  connectedTo: "",
  position: [],
  disabled: true,
  isConnectedToDragging: false,
};

export const cardWithID = (id, defaultState) =>
  atom({
    key: `${id}`,
    default: {
      ...DefaultState,
      ...defaultState,
      id: id,
    },
  });

export const stateListener = atom({
  key: "cardStateListener",
  default: {
    listening: "",
  },
});
