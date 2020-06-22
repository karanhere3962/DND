import { atom } from "recoil";

const DefaultState = {
  dimensions: [],
  placeholder: "Enter your content.",
  content: "",
  connectedFrom: "",
  connectedTo: "",
  position: [],
  disabled: true,
};

export const cardWithID = (id, defaultState) =>
  atom({
    key: `${id}`,
    default: {
      ...DefaultState,
      ...defaultState,
    },
  });

export const stateListener = atom({
  key: "cardStateListener",
  default: {
    listening: "",
  },
});
