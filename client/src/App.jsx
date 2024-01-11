import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ColorPicker from "./components/ColorPicker";
import HueSlider from "./components/HueSlider";
import AlphaSlider from "./components/AlphaSlider";
import HslaInput from "./components/HslaInput";
import { hslToRgb, rgbToHsl } from "./utilities/colorFunctions";
import { isEmpty } from "./utilities/sharedFunctions";

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
  const [pickerSaturation, setPickerSaturation] = useState(100);
  const [pickerLightness, setPickerLightness] = useState(50);

  const [txtHsla, setTxtHsla] = useState("");

  let hslaString = `${rngHue}, ${pickerSaturation}%, ${pickerLightness}%, ${rngAlpha}`;
  let hslToRgbConversion = hslToRgb(rngHue, (pickerSaturation / 100), (pickerLightness / 100));
  let rgbaString = `${hslToRgbConversion[0]}, ${hslToRgbConversion[1]}, ${hslToRgbConversion[2]}, ${rngAlpha}`;

  // useEffect(() => {

  //   if (isEmpty(txtHsla) === false) {

  //     let hslaValues = txtHsla.split(", ");

  //     let newHue = hslaValues[0];
  //     let newSaturation = hslaValues[1].replace(/%/g, "");
  //     let newLightness = hslaValues[2].replace(/%/g, "");
  //     let newAlpha = hslaValues[3];

  //     if (rngHue !== newHue) {
  //       setRngHue(newHue);
  //     };

  //     if (saturation !== newSaturation) {
  //       setPickerSaturation(newSaturation);
  //     };

  //     if (lightness !== newLightness) {
  //       setPickerLightness(newLightness);
  //     };

  //     if (rngAlpha !== newAlpha) {
  //       setRngAlpha(newAlpha);
  //     };

  //   }

  // }, [txtHsla, rngAlpha, rngHue, saturation, lightness]);

  return (
    <main>
      <h1 className="sr-only">Color Picker</h1>

      <ColorPicker hue={rngHue} setPickerSaturation={setPickerSaturation} setPickerLightness={setPickerLightness} />

      <div style={{ marginTop: "1rem" }}>

        <HueSlider
          rngHue={rngHue}
          setRngHue={setRngHue} />

        <AlphaSlider
          rngAlpha={rngAlpha}
          setRngAlpha={setRngAlpha}
          rngHue={rngHue}
          pickerSaturation={pickerSaturation}
          pickerLightness={pickerLightness} />
      </div>

      <div className="info">
        <strong>Selected Color</strong>
        <StyledSelectColor
          $hue={rngHue}
          $saturation={pickerSaturation}
          $lightness={pickerLightness}
          $alpha={rngAlpha} />
      </div>

      {/* <HslaInput
        txtHsla={txtHsla}
        setTxtHsla={setTxtHsla}
        rngAlpha={rngAlpha}
        rngHue={rngHue}
        pickerSaturation={pickerSaturation}
        pickerLightness={pickerLightness} /> */}

      <div>
        <p>hsla({hslaString})</p>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <p>rgba({rgbaString})</p>
      </div>



    </main>
  );
};

export default App;
