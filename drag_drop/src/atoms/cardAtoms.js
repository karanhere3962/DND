import { atom } from "recoil";

const DefaultState = {
  dimensions: [],
  placeholder: "Enter your content.",
  content: "",
  connectedFrom: "",
  connectedTo: "",
  position: [],
};

export const cardWithID = (id, defaultState) =>
  atom({
    key: `${id}`,
    default: {
      ...DefaultState,
      ...defaultState,
    },
  });
