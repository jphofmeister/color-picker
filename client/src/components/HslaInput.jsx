import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import FormInput from "./common/FormInput";

const HslaInput = (props) => {

  // * Available props:
  // * Properties: hue
  // * Functions: setSaturation, setLightness

  // let componentName = "HslaInput";

  let txtHsla = isEmpty(props) === false && isEmpty(props.txtHsla) === false ? props.txtHsla : "";
  let rngAlpha = isEmpty(props) === false && isEmpty(props.rngAlpha) === false ? props.rngAlpha : 1;
  let rngHue = isEmpty(props) === false && isEmpty(props.rngHue) === false ? props.rngHue : 0;
  let saturation = isEmpty(props) === false && isEmpty(props.saturation) === false ? props.saturation : 100;
  let lightness = isEmpty(props) === false && isEmpty(props.lightness) === false ? props.lightness : 50;

  let setTxtHsla = isEmpty(props.setTxtHsla) === false ? props.setTxtHsla : noFunctionAvailable;

  useEffect(() => {

    let hslaString = `${rngHue}, ${saturation}%, ${lightness}%, ${rngAlpha}`;

    if (hslaString !== txtHsla) {
      setTxtHsla(hslaString);
    }

  }, [rngAlpha, rngHue, saturation, lightness, txtHsla]);

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