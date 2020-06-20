import React, { useRef, useLayoutEffect } from "react";
import { cardWithID } from "../../atoms";
import { useRecoilState } from "recoil";

const Card = (props) => {
  const id = "card";
  const [cardState, cardStateChanger] = useRecoilState(cardWithID(id));
  return <div></div>;
};

export default Card;
