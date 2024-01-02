import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ColorPicker from "./components/ColorPicker";
import HueSlider from "./components/HueSlider";
import AlphaSlider from "./components/AlphaSlider";
import HslaInput from "./components/HslaInput";
import { hslToRgb, rgbToHsl } from "./utilities/colorFunctions";

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

  const [txtHsla, setTxtHsla] = useState("");

  let hslaString = `${rngHue}, ${saturation}%, ${lightness}%, ${rngAlpha}`;
  let hslToRgbConversion = hslToRgb(rngHue, (saturation / 100), (lightness / 100));
  let rgbaString = `${hslToRgbConversion[0]}, ${hslToRgbConversion[1]}, ${hslToRgbConversion[2]}, ${rngAlpha}`;


  return (
    <main>
      <h1>Color Picker</h1>

      <HueSlider
        rngHue={rngHue}
        setRngHue={setRngHue} />

      <AlphaSlider
        rngAlpha={rngAlpha}
        setRngAlpha={setRngAlpha}
        rngHue={rngHue}
        saturation={saturation}
        lightness={lightness} />

      <div className="info">
        <strong>Selected Color</strong>
        <StyledSelectColor $hue={rngHue} $saturation={saturation} $lightness={lightness} $alpha={rngAlpha} />
      </div>

      <div>
        <p>hsla({hslaString})</p>

        <HslaInput
          txtHsla={txtHsla}
          setTxtHsla={setTxtHsla}
          rngAlpha={rngAlpha}
          rngHue={rngHue}
          saturation={saturation}
          lightness={lightness} />

        <p>rgba({rgbaString})</p>
      </div>

      <ColorPicker hue={rngHue} setSaturation={setSaturation} setLightness={setLightness} />

    </main>
  );
};

export default App;
