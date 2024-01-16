import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import FormInput from "./common/FormInput";

const RgbaInput = (props) => {

  // * Available props:
  // * Properties: hue
  // * Functions: setPickerSaturation, setPickerLightness

  // let componentName = "RgbaInput";

  let txtRgba = isEmpty(props) === false && isEmpty(props.txtRgba) === false ? props.txtRgba : "";
  let rngAlpha = isEmpty(props) === false && isEmpty(props.rngAlpha) === false ? props.rngAlpha : 1;
  let rngHue = isEmpty(props) === false && isEmpty(props.rngHue) === false ? props.rngHue : 0;
  let pickerSaturation = isEmpty(props) === false && isEmpty(props.pickerSaturation) === false ? props.pickerSaturation : 100;
  let pickerLightness = isEmpty(props) === false && isEmpty(props.pickerLightness) === false ? props.pickerLightness : 50;

  let setTxtRgba = isEmpty(props.setTxtRgba) === false ? props.setTxtRgba : noFunctionAvailable;

  // useEffect(() => {

  //   let hslaString = `${rngHue}, ${pickerSaturation}%, ${pickerLightness}%, ${rngAlpha}`;

  //   if (hslaString !== txtRgba) {
  //     setTxtRgba(hslaString);
  //   }

  // }, [rngAlpha, rngHue, pickerSaturation, pickerLightness, txtRgba]);

  return (
    <>
      <FormInput
        formInputID="txtRgba"
        labelText="RGBA"
        inputValue={txtRgba}
        updateValue={setTxtRgba}
      />
    </>
  );
};

export default RgbaInput;