import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { randomStringGenerator as stringGenerator } from "./helperFunctions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SideBar from "./components/SideBar/SideBar";
import Canvas from "./components/Canvas/Canvas";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SideBar />
      <Canvas />
    </DndProvider>
  );
}

export default App;
