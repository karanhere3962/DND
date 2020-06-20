import React from "react";
import "./SideBar.css";
import Card from "../Card/Card";
import { randomStringGenerator } from "../../helperFunctions";

const SideBar = (props) => {
  return (
    <div className="sideBar">
      <Card id={"sideBarComponent" + randomStringGenerator()} />
    </div>
  );
};

export default SideBar;
