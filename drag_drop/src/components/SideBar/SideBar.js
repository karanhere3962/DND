import React from "react";
import "./SideBar.css";
import Card from "../Card/Card";
import { randomStringGenerator } from "../../helperFunctions";
import SidebarComponent from "../SidebarComponent/SidebarComponent";

const SideBar = (props) => {
  return (
    <div className="sideBar">
      <SidebarComponent id={"sideBarComponent" + randomStringGenerator()} />
    </div>
  );
};

export default SideBar;
