import React from "react";
import "./SideBar.css";
import { randomStringGenerator } from "../../helperFunctions";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import stateHolder from "../../stateHolder";

const SideBar = (props) => {
  return (
    <div className="sideBar">
      <SidebarComponent
        id={"sideBarComponent" + randomStringGenerator()}
        shouldBeDraggable={true}
      />
      <SidebarComponent
        id={"sideBarComponent" + randomStringGenerator()}
        shouldBeDraggable={false}
        content="Download JSON"
        onClick={() => {
          let componentState = JSON.stringify(
            stateHolder.returnComponentJson()
          );
          const element = document.createElement("a");
          const file = new Blob([componentState], { type: "text/plain" });
          element.href = URL.createObjectURL(file);
          element.download = "componentStates.json";
          document.body.appendChild(element);
          element.click();
        }}
      />
    </div>
  );
};

export default SideBar;
