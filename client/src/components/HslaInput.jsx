import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import FormInput from "./common/FormInput";

const HslaInput = (props) => {

  // * Available props:
  // * Properties: hue
  // * Functions: setPickerSaturation, setPickerLightness

  // let componentName = "HslaInput";

  let txtHsla = isEmpty(props) === false && isEmpty(props.txtHsla) === false ? props.txtHsla : "";
  let rngAlpha = isEmpty(props) === false && isEmpty(props.rngAlpha) === false ? props.rngAlpha : 1;
  let rngHue = isEmpty(props) === false && isEmpty(props.rngHue) === false ? props.rngHue : 0;
  let pickerSaturation = isEmpty(props) === false && isEmpty(props.pickerSaturation) === false ? props.pickerSaturation : 100;
  let pickerLightness = isEmpty(props) === false && isEmpty(props.pickerLightness) === false ? props.pickerLightness : 50;

  let setTxtHsla = isEmpty(props.setTxtHsla) === false ? props.setTxtHsla : noFunctionAvailable;

  useEffect(() => {

    let hslaString = `${rngHue}, ${pickerSaturation}%, ${pickerLightness}%, ${rngAlpha}`;

    if (hslaString !== txtHsla) {
      setTxtHsla(hslaString);
    }

  }, [rngAlpha, rngHue, pickerSaturation, pickerLightness, txtHsla]);

  return (
    <>
      <FormInput
        formInputID="txtHsla"
        labelText="HSLA"
        inputValue={txtHsla}
        updateValue={setTxtHsla}
      />
    </>
  );
};

export default HslaInput;