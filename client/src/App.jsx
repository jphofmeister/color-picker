import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ColorPicker from "./components/ColorPicker";
import HueInput from "./components/HueInput";
import AlphaInput from "./components/AlphaInput";
import FormInput from "./components/common/FormInput";

const StyledSelectColor = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid rgba(15, 15, 15, 0.2);
  background-color: hsla(${props => props.$hue}, ${props => props.$saturation}%, ${props => props.$lightness}%, ${props => props.$alpha});
`;

const App = () => {

  const [rngHue, setRngHue] = useState(0);
  const [rngAlpha, setRngAlpha] = useState(1);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);


  return (
    <main>
      <h1>Color Picker</h1>

      <HueInput rngHue={rngHue} setRngHue={setRngHue} />

      <AlphaInput rngAlpha={rngAlpha} setRngAlpha={setRngAlpha} rngHue={rngHue} saturation={saturation} lightness={lightness} />

      <div className="info">

        <p><strong>Selected Color:</strong> hsla({rngHue}, {saturation}%, {lightness}%, {rngAlpha})</p>

        <StyledSelectColor $hue={rngHue} $saturation={saturation} $lightness={lightness} $alpha={rngAlpha} />

      </div>

      <ColorPicker hue={rngHue} setSaturation={setSaturation} setLightness={setLightness} />

    </main>
  );
};

export default App;
