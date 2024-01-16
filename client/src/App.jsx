import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ColorPicker from "./components/ColorPicker";
import HueSlider from "./components/HueSlider";
import AlphaSlider from "./components/AlphaSlider";
import HslaInput from "./components/HslaInput";
import RgbaInput from "./components/RgbaInput";
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

  // const [hue, setHue] = useState(0)
  // const [saturation, setSaturation] = useState(100)
  // const [lightness, setLightness] = useState(50)
  // const [alpha, setAlpha] = useState(1)

  const [rngHue, setRngHue] = useState(0);
  const [pickerSaturation, setPickerSaturation] = useState(100);
  const [pickerLightness, setPickerLightness] = useState(50);
  const [rngAlpha, setRngAlpha] = useState(1);

  const [txtHsla, setTxtHsla] = useState("");
  const [txtRgba, setTxtRgba] = useState("");


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


  // useEffect(() => {

  //   updateTextFields(rngHue, pickerSaturation, pickerLightness, rngAlpha);

  // }, []);


  const updateTextFields = (updatedHue, updatedSaturation, updatedLightness, updatedAlpha) => {

    console.log("updateTextFields");

    let newHue = isEmpty(updatedHue) === false ? updatedHue : rngHue;
    let newSaturation = isEmpty(updatedSaturation) === false ? updatedSaturation : pickerSaturation;
    let newLightness = isEmpty(updatedLightness) === false ? updatedLightness : pickerLightness;
    let newAlpha = isEmpty(updatedAlpha) === false ? updatedAlpha : rngAlpha;

    let hslaString = `${newHue}, ${newSaturation}%, ${newLightness}%, ${newAlpha}`;

    let hslToRgbConversion = hslToRgb((newHue / 360), (newSaturation / 100), (newLightness / 100));

    let rgbaString = `${hslToRgbConversion[0]}, ${hslToRgbConversion[1]}, ${hslToRgbConversion[2]}, ${newAlpha}`;

    setTxtHsla(hslaString);
    setTxtRgba(rgbaString);

  };


  const updateInteractiveFields = (newHsla) => {

    console.log("updateInteractiveFields");

    if (isEmpty(newHsla) === false) {

      let hslaValues = newHsla.split(", ");

      let newHue = hslaValues[0];
      let newSaturation = hslaValues[1].replace(/%/g, "");
      let newLightness = hslaValues[2].replace(/%/g, "");
      let newAlpha = hslaValues[3];

      if (rngHue !== newHue) {
        setRngHue(newHue);
      };

      if (pickerSaturation !== newSaturation) {
        setPickerSaturation(newSaturation);
      };

      if (pickerLightness !== newLightness) {
        setPickerLightness(newLightness);
      };

      if (rngAlpha !== newAlpha) {
        setRngAlpha(newAlpha);
      };

    };

  };


  return (
    <main>
      <h1 className="sr-only">Color Picker</h1>

      <ColorPicker
        hue={rngHue}
        pickerSaturation={pickerSaturation}
        pickerLightness={pickerLightness}
        setPickerSaturation={setPickerSaturation}
        setPickerLightness={setPickerLightness}
        updateTextFields={updateTextFields} />

      <div style={{ marginTop: "1rem" }}>

        <HueSlider
          rngHue={rngHue}
          setRngHue={setRngHue}
          updateTextFields={updateTextFields} />

        <AlphaSlider
          rngAlpha={rngAlpha}
          setRngAlpha={setRngAlpha}
          rngHue={rngHue}
          pickerSaturation={pickerSaturation}
          pickerLightness={pickerLightness}
          updateTextFields={updateTextFields} />
      </div>

      <div className="info">
        <strong>Selected Color</strong>
        <StyledSelectColor
          $hue={rngHue}
          $saturation={pickerSaturation}
          $lightness={pickerLightness}
          $alpha={rngAlpha} />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <HslaInput
          txtHsla={txtHsla}
          setTxtHsla={setTxtHsla}
          updateInteractiveFields={updateInteractiveFields}
        // rngAlpha={rngAlpha}
        // rngHue={rngHue}
        // pickerSaturation={pickerSaturation}
        // pickerLightness={pickerLightness} 
        />

        <RgbaInput
          txtRgba={txtRgba}
          setTxtRgba={setTxtRgba}
        // rngAlpha={rngAlpha}
        // rngHue={rngHue}
        // pickerSaturation={pickerSaturation}
        // pickerLightness={pickerLightness} 
        />
      </div>

      {/* <div>
        <p>hsla({txtHsla})</p>
      </div> */}

      {/* <div style={{ marginTop: "1rem" }}>
        <p>rgba({rgbaString})</p>
      </div> */}



    </main>
  );
};

export default App;
