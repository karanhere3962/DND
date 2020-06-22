import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { randomStringGenerator as stringGenerator } from "./helperFunctions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SideBar from "./components/SideBar/SideBar";
import Canvas from "./components/Canvas/Canvas";
import { RecoilRoot } from "recoil";
import { ArcherContainer } from "react-archer";

function App() {
  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <SideBar />
        <Canvas />
      </DndProvider>
    </RecoilRoot>
  );
}

export default App;
