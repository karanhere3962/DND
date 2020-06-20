import { atom } from "recoil";

const DefaultState = {
    dimensions : [],
    placeholder : "Enter your content.",
    content : "",
    connectedFrom : "",
    connectedTo : ""
};

export const cardWithID = memoize((id, defaultState = {}) =>
  atom({
    key: `item${id}`,
    default: {
      ...DefaultState,
      ...defaultState,
    },
  })
);
