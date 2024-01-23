import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { isEmpty } from "./utilities/sharedFunctions";
import Login from "./components/Login";

const StyledSelectColor = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid rgba(15, 15, 15, 0.2);
  background-color: hsla(${props => props.$hue}, ${props => props.$saturation}%, ${props => props.$lightness}%, ${props => props.$alpha});
`;

const App = () => {

  const [color, setColor] = useColor("#561ecb");

  useEffect(() => {

    console.log("color", color);

  }, [color]);

  return (
    <main style={{ maxWidth: "300px" }}>

      <Login />

      <ColorPicker color={color} onChange={setColor} />

    </main>
  );
};

export default App;
