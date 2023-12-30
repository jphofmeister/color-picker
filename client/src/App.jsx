import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ColorPicker from "./components/ColorPicker";
import HueInput from "./components/HueInput";
import AlphaInput from "./components/AlphaInput";
import FormInput from "./components/common/FormInput";

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
        <p>
          <strong>Selected Color:</strong> hsla({rngHue}, {saturation}%, {lightness}%, {rngAlpha})
        </p>

        <div className="selected-color" style={{
          background: `hsla(${rngHue}, ${saturation}%, ${lightness}%, ${rngAlpha})`
        }}></div>
      </div>

      <ColorPicker hue={rngHue} setSaturation={setSaturation} setLightness={setLightness} />

    </main>
  );
};

export default App;
